package campaigns

import (
	"log"
	"openinvoice-api/internal/pgdb"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
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
