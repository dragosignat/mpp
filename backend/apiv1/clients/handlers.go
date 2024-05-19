package clients

import (
	"log"
	"openinvoice-api/internal/pgdb"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getClients(c *gin.Context) {

	start, err := strconv.Atoi(c.DefaultQuery("start", "0"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid start parameter"})
		return
	}

	limit, err := strconv.Atoi(c.DefaultQuery("limit", "100"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid limit parameter"})
		return
	}

	clients, err := s.queries.GetClientsWithOutgoingInvoicesAmount(c, pgdb.GetClientsWithOutgoingInvoicesAmountParams{
		Offset: int32(start),
		Limit:  int32(limit),
	})

	// clients, err := s.queries.GetClientsWithOutgoingInvoicesAmountFull(c)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching clients"})
		log.Println(err)
		return
	}

	if clients == nil {
		c.JSON(404, gin.H{"message": "No clients found"})
		return
	}

	c.JSON(200, clients)

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

	if err != nil {
		c.JSON(500, gin.H{"message": "Error deleting client"})
		return
	}

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
		Name:           client.Name,
		Email:          pgtype.Text{String: client.Email, Valid: true},
		Phone:          pgtype.Text{String: client.Phone, Valid: true},
		IsBusiness:     pgtype.Bool{Bool: *client.IsBusiness, Valid: true},
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

	var uuid_client pgtype.UUID
	err := uuid_client.Scan(clientId)

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
		ID:             uuid_client,
		Name:           client.Name,
		Email:          pgtype.Text{String: client.Email, Valid: true},
		Phone:          pgtype.Text{String: client.Phone, Valid: true},
		IsBusiness:     pgtype.Bool{Bool: *client.IsBusiness, Valid: true},
		Address:        pgtype.Text{String: client.Address, Valid: true},
		TotalPurchases: pgtype.Int4{Int32: int32(client.TotalPurchases), Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error updating client"})
		return
	}

	updatedClient, err := s.queries.GetClientByID(c, uuid_client)
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	c.JSON(200, updatedClient)
}

func (s *Service) generateFake(c *gin.Context) {

	newPerson := GeneratePerson()

	newClient, err := s.queries.CreateClient(c, pgdb.CreateClientParams{
		Name:           newPerson.Name,
		Email:          pgtype.Text{String: newPerson.Email, Valid: true},
		Phone:          pgtype.Text{String: newPerson.Phone, Valid: true},
		IsBusiness:     pgtype.Bool{Bool: newPerson.IsBusiness, Valid: true},
		Address:        pgtype.Text{String: newPerson.Address, Valid: true},
		TotalPurchases: pgtype.Int4{Int32: int32(newPerson.TotalPurchases), Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating client"})
		return
	}

	c.JSON(200, newClient)
}

func (s *Service) getTotalClients(c *gin.Context) {

	totalClients, err := s.queries.GetTotalNumberOfClients(c)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching total clients"})
		return
	}

	c.JSON(200, gin.H{"total_clients": totalClients})
}

func (s *Service) searchClients(c *gin.Context) {

	query := c.Query("query")

	if query == "" {
		c.JSON(400, gin.H{"message": "Query parameter is required"})
		return
	}

	// Make sure the query is at least 3 characters long
	if len(query) < 3 {
		c.JSON(400, gin.H{"message": "Query parameter must be at least 3 characters long"})
		return
	}

	// Search clients (change the query so it can be used in a LIKE statement)
	query = "%" + query + "%"

	clients, err := s.queries.SearchClients(c, pgdb.SearchClientsParams{
		Name:  query,
		Limit: 50,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error searching clients"})
		return
	}

	c.JSON(200, clients)
}
