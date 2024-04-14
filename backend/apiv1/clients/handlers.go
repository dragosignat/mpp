package clients

import (
	"log"
	"openinvoice-api/internal/pgdb"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getClients(c *gin.Context) {

	clients, err := s.queries.GetClients(c)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching clients"})
		log.Println(err)
		return
	}

	if clients == nil {
		c.JSON(404, gin.H{"message": "No clients found"})
		return
	}

	// Bind the clients to the the Clinet struct and return it

	var clientList []Client

	for _, client := range clients {
		clientList = append(clientList, Client{
			ID:             uuid.UUID(client.ID.Bytes).String(),
			Name:           client.Name.String,
			Email:          client.Email.String,
			Phone:          client.Phone.String,
			IsBusiness:     client.IsBussiness.Bool,
			Address:        client.Address.String,
			TotalPurchases: int(client.TotalPurchases.Int32),
		})
	}

	c.JSON(200, clientList)
}

func (s *Service) getClient(c *gin.Context) {

	clientId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	client, err := s.queries.GetClientByID(c, uuid)

	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	c.JSON(200, client)
}

func (s *Service) deleteClient(c *gin.Context) {
	clientId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	_, err = s.queries.GetClientByID(c, uuid)
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	err = s.queries.DeleteClient(c, uuid)

	c.JSON(200, "Client deleted successfully")
}

func (s *Service) createClient(c *gin.Context) {

	var client ClientsCreate
	err := c.ShouldBindJSON(&client)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid JSON"})
		return
	}

	newClient, err := s.queries.CreateClient(c, pgdb.CreateClientParams{
		Name:           pgtype.Text{String: client.Name, Valid: true},
		Email:          pgtype.Text{String: client.Email, Valid: true},
		Phone:          pgtype.Text{String: client.Phone, Valid: true},
		IsBussiness:    pgtype.Bool{Bool: *client.IsBusiness, Valid: true},
		Address:        pgtype.Text{String: client.Address, Valid: true},
		TotalPurchases: pgtype.Int4{Int32: int32(client.TotalPurchases), Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating client"})
		return
	}

	c.JSON(200, newClient)
}

func (s *Service) updateClient(c *gin.Context) {

	clientId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	var client ClientsCreate
	err = c.ShouldBindJSON(&client)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid JSON"})
		return
	}

	err = s.queries.UpdateClient(c, pgdb.UpdateClientParams{
		ID:             uuid,
		Name:           pgtype.Text{String: client.Name, Valid: true},
		Email:          pgtype.Text{String: client.Email, Valid: true},
		Phone:          pgtype.Text{String: client.Phone, Valid: true},
		IsBussiness:    pgtype.Bool{Bool: *client.IsBusiness, Valid: true},
		Address:        pgtype.Text{String: client.Address, Valid: true},
		TotalPurchases: pgtype.Int4{Int32: int32(client.TotalPurchases), Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error updating client"})
		return
	}

	c.JSON(200, gin.H{"message": "Client updated successfully"})

}
