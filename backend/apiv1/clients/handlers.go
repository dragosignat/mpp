package clients

import (
	"encoding/json"
	"log"
	"net/http"
	"openinvoice-api/internal/pgdb"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getClients(c *gin.Context) {
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

	clients, err := s.queries.GetClients(c, pgdb.GetClientsParams{
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
		Offset:  int32(offset),
		Limit:   int32(pageSize),
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching clients"})
		log.Println(err)
		return
	}

	if len(clients) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No clients found"})
		return
	}

	c.JSON(http.StatusOK, clients)
}

func (s *Service) getClient(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	clientID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	client, err := s.queries.GetClientByID(c, pgdb.GetClientByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Client not found"})
		return
	}

	c.JSON(http.StatusOK, client)
}

func (s *Service) createClient(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	var client ClientCreate
	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	socialLinks, err := json.Marshal(client.SocialLink)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid social links", "error": err.Error()})
		return
	}

	birthDate := pgtype.Date{}
	if client.BirthDate != "" {
		err := birthDate.Scan(client.BirthDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid birth date", "error": err.Error()})
			return
		}
	}

	lastContact := pgtype.Timestamp{}
	if client.LastContact != "" {
		err := lastContact.Scan(client.LastContact)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid last contact date", "error": err.Error()})
			return
		}
	}

	clientSQL := pgdb.CreateClientParams{
		OwnerID:                pgtype.Int4{Int32: userID, Valid: true},
		FirstName:              client.FirstName,
		LastName:               client.LastName,
		Email:                  pgtype.Text{String: client.Email, Valid: client.Email != ""},
		Phone:                  pgtype.Text{String: client.Phone, Valid: client.Phone != ""},
		CompanyID:              pgtype.Int4{Int32: int32(client.CompanyID), Valid: true},
		Position:               pgtype.Text{String: client.Position, Valid: client.Position != ""},
		SocialLinks:            socialLinks,
		Notes:                  pgtype.Text{String: client.Notes, Valid: client.Notes != ""},
		Birthday:               birthDate,
		LastContact:            lastContact,
		PreferredContactMethod: pgtype.Text{String: client.PreferredContactMethod, Valid: client.PreferredContactMethod != ""},
	}

	newClient, err := s.queries.CreateClient(c, clientSQL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating client", "error": err.Error()})
		log.Println("Error creating client:", err)
		return
	}

	c.JSON(http.StatusCreated, newClient)
}

func (s *Service) deleteClient(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	clientID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	err = s.queries.DeleteClient(c, pgdb.DeleteClientParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error deleting client", "error": err.Error()})
		log.Println("Error deleting client:", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Client deleted successfully"})
}

func (s *Service) searchClients(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	query := c.Query("query")

	if len(query) < 3 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Query parameter must be at least 3 characters long"})
		return
	}

	query = "%" + query + "%"

	clients, err := s.queries.SearchClients(c, pgdb.SearchClientsParams{
		FirstName: query,
		OwnerID:   pgtype.Int4{Int32: userID, Valid: true},
		Limit:     50,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error searching clients", "error": err.Error()})
		log.Println("Error searching clients:", err)
		return
	}

	c.JSON(http.StatusOK, clients)
}

func (s *Service) updateClient(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	clientID := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid UUID"})
		return
	}

	var client ClientCreate
	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	socialLinks, err := json.Marshal(client.SocialLink)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid social links", "error": err.Error()})
		return
	}

	birthDate := pgtype.Date{}
	if client.BirthDate != "" {
		err := birthDate.Scan(client.BirthDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid birth date", "error": err.Error()})
			return
		}
	}

	lastContact := pgtype.Timestamp{}
	if client.LastContact != "" {
		err := lastContact.Scan(client.LastContact)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid last contact date", "error": err.Error()})
			return
		}
	}

	updateParams := pgdb.UpdateClientParams{
		Pid:                    uuid,
		OwnerID:                pgtype.Int4{Int32: userID, Valid: true},
		FirstName:              client.FirstName,
		LastName:               client.LastName,
		Email:                  pgtype.Text{String: client.Email, Valid: client.Email != ""},
		Phone:                  pgtype.Text{String: client.Phone, Valid: client.Phone != ""},
		CompanyID:              pgtype.Int4{Int32: int32(client.CompanyID), Valid: true},
		Position:               pgtype.Text{String: client.Position, Valid: client.Position != ""},
		SocialLinks:            socialLinks,
		Notes:                  pgtype.Text{String: client.Notes, Valid: client.Notes != ""},
		Birthday:               birthDate,
		LastContact:            lastContact,
		PreferredContactMethod: pgtype.Text{String: client.PreferredContactMethod, Valid: client.PreferredContactMethod != ""},
	}

	err = s.queries.UpdateClient(c, updateParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error updating client", "error": err.Error()})
		log.Println("Error updating client:", err)
		return
	}

	updatedClient, err := s.queries.GetClientByID(c, pgdb.GetClientByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching updated client", "error": err.Error()})
		log.Println("Error fetching updated client:", err)
		return
	}

	c.JSON(http.StatusOK, updatedClient)
}
