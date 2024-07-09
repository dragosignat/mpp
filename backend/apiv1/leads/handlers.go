package leads

import (
	"log"
	"net/http"
	"openinvoice-api/internal/pgdb"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getLeads(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	// Paginate
	pageStr := c.DefaultQuery("page", "1")
	pageSizeStr := c.DefaultQuery("pageSize", "10")

	page, err := strconv.ParseInt(pageStr, 10, 32)
	if err != nil || page < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid page"})
		return
	}

	pageSize, err := strconv.ParseInt(pageSizeStr, 10, 32)
	if err != nil || pageSize < 1 || pageSize > 100 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid pageSize"})
		return
	}

	offset := (page - 1) * pageSize

	leads, err := s.queries.GetLeads(c, pgdb.GetLeadsParams{
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
		Offset:  int32(offset),
		Limit:   int32(pageSize),
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching leads"})
		log.Println(err)
		return
	}

	if len(leads) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No leads found"})
		return
	}

	c.JSON(http.StatusOK, leads)
}

func (s *Service) getLead(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	leadID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(leadID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	lead, err := s.queries.GetLeadByID(c, pgdb.GetLeadByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Lead not found"})
		return
	}

	c.JSON(http.StatusOK, lead)
}

func (s *Service) createLead(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	var lead pgdb.CreateLeadParams
	if err := c.ShouldBindJSON(&lead); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	lead.OwnerID = pgtype.Int4{Int32: userID, Valid: true}

	newLead, err := s.queries.CreateLead(c, lead)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating lead", "error": err.Error()})
		log.Println("Error creating lead:", err)
		return
	}

	c.JSON(http.StatusCreated, newLead)
}

func (s *Service) updateLead(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	leadID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(leadID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	var updateParams pgdb.UpdateLeadParams
	if err := c.ShouldBindJSON(&updateParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	updateParams.Pid = uuid
	updateParams.OwnerID = pgtype.Int4{Int32: userID, Valid: true}

	err = s.queries.UpdateLead(c, updateParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error updating lead", "error": err.Error()})
		log.Println("Error updating lead:", err)
		return
	}

	updatedLead, err := s.queries.GetLeadByID(c, pgdb.GetLeadByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching updated lead", "error": err.Error()})
		log.Println("Error fetching updated lead:", err)
		return
	}

	c.JSON(http.StatusOK, updatedLead)
}

func (s *Service) deleteLead(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	leadID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(leadID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	err = s.queries.DeleteLead(c, pgdb.DeleteLeadParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error deleting lead", "error": err.Error()})
		log.Println("Error deleting lead:", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Lead deleted successfully"})
}

func (s *Service) searchLeads(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	query := c.Query("query")

	if len(query) < 3 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Query parameter must be at least 3 characters long"})
		return
	}

	query = "%" + query + "%"

	leads, err := s.queries.SearchLeads(c, pgdb.SearchLeadsParams{
		FirstName: query,
		OwnerID:   pgtype.Int4{Int32: userID, Valid: true},
		Limit:     50,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error searching leads", "error": err.Error()})
		log.Println("Error searching leads:", err)
		return
	}

	c.JSON(http.StatusOK, leads)
}
