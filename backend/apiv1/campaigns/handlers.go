package campaigns

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"openinvoice-api/internal/pgdb"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

var (
	// AI_SERVICE_URL = os.Getenv("AI_SERVICE_URL")
	AI_SERVICE_URL = "http://localhost:8000/sentiment"
)

func (s *Service) List(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	campaigns, err := s.queries.GetCampaigns(c, pgtype.Int4{
		Int32: userID,
		Valid: true,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching campaigns"})
		log.Println(err)
		return
	}

	if campaigns == nil {
		c.JSON(404, gin.H{"message": "No campaigns found"})
		return
	}

	c.JSON(200, campaigns)

}

func (s *Service) Get(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	campaignID := c.Param("id")
	id := pgtype.Int4{}
	err := id.Scan(campaignID)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid ID"})
		return
	}

	campaign, err := s.queries.GetCampaignByID(c, pgdb.GetCampaignByIDParams{
		ID:      id.Int32,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	postive, err := s.queries.GetSentimentCountByCampaignID(c, pgdb.GetSentimentCountByCampaignIDParams{
		CampaignID: id.Int32,
		Sentiment:  "pos",
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching campaigns"})
		log.Println(err)
		return
	}

	negative, err := s.queries.GetSentimentCountByCampaignID(c, pgdb.GetSentimentCountByCampaignIDParams{
		CampaignID: id.Int32,
		Sentiment:  "neg",
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching campaigns"})
		log.Println(err)
		return
	}

	neutral, err := s.queries.GetSentimentCountByCampaignID(c, pgdb.GetSentimentCountByCampaignIDParams{
		CampaignID: id.Int32,
		Sentiment:  "neu",
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching campaigns"})
		log.Println(err)
		return
	}

	var overallSentiment string

	if postive > negative && postive > neutral {
		overallSentiment = "pos"
	} else if negative > postive && negative > neutral {
		overallSentiment = "neg"
	} else {
		overallSentiment = "neu"
	}

	var response = DetailedCampaign{
		ID:               campaign.ID,
		Name:             campaign.Name,
		Description:      campaign.Description.String,
		CreatedAt:        campaign.CreatedAt.Time.String(),
		UpdatedAt:        campaign.UpdatedAt.Time.String(),
		ReviewCount:      campaign.ReviewCount,
		Positive:         postive,
		Negative:         negative,
		Neutral:          neutral,
		OverallSentiment: overallSentiment,
		IsActive:         campaign.IsActive,
		IsProcessing:     campaign.IsProcessing,
	}

	if err != nil {
		c.JSON(404, gin.H{"message": "Campaign not found"})
		return
	}

	c.JSON(200, response)

}

func (s *Service) Create(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	// Retrieve the CSV file from the request
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "File is required"})
		return
	}

	// Save the file temporarily to read its content
	filePath := fmt.Sprintf("uploads/%s", file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to save file"})
		return
	}
	defer os.Remove(filePath) // Clean up the file after reading

	// Open the file
	f, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to open file"})
		return
	}
	defer f.Close()

	// Parse the CSV file
	reader := csv.NewReader(f)
	records, err := reader.ReadAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to parse CSV file"})
		return
	}

	// Extract name and description from the request
	var req CreateCampaignRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request data"})
		return
	}

	// Create a new campaign in the database
	campaign, err := s.queries.CreateCampaign(c, pgdb.CreateCampaignParams{
		Name:        req.Name,
		Description: pgtype.Text{String: req.Description, Valid: true},
		OwnerID:     pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to create campaign"})
		return
	}

	// Process the CSV data
	var reviews []Review
	for _, record := range records {
		reviews = append(reviews, Review{
			ReviewID:   record[0],
			ReviewText: record[1],
		})
	}

	// Here you can send the CSV data to another service
	// Example: sending the reviews to another service
	go sendReviewsToService(reviews, int(campaign.ID))

	c.JSON(http.StatusCreated, gin.H{"message": "Campaign created successfully", "campaign_id": campaign.ID})
}

func sendReviewsToService(reviews []Review, campaignId int) {
	// Send the reviews to another service
	log.Default().Println("Sending reviews to another service")

	// Strip the id from the review
	var reviewTexts []string
	for _, review := range reviews {
		reviewTexts = append(reviewTexts, review.ReviewText)
	}

	// Create a map to hold the request payload
	payload := map[string]interface{}{
		"reviews":     reviewTexts,
		"campaign_id": campaignId,
	}

	// Marshal the payload to JSON
	body, err := json.Marshal(payload)
	if err != nil {
		log.Println("Error marshaling JSON:", err)
		return
	}

	// Send the request
	resp, err := http.Post(AI_SERVICE_URL, "application/json", bytes.NewBuffer(body))
	if err != nil {
		log.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
}
