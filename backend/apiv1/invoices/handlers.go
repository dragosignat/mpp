package invoices

import (
	"log"
	"math/rand"
	"openinvoice-api/internal/pgdb"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getInvoices(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	invoices, err := s.queries.GetInvoices(c, pgtype.Int4{
		Int32: userID,
		Valid: true,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching invoices"})
		log.Println(err)
		return
	}

	if invoices == nil {
		c.JSON(404, gin.H{"message": "No invoices found"})
		return
	}

	c.JSON(200, invoices)
}

func (s *Service) getInvoice(c *gin.Context) {

	userID := c.MustGet("userID").(int32)
	invoiceId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(invoiceId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	invoice, err := s.queries.GetInvoiceByID(c, pgdb.GetInvoiceByIDParams{
		ID:      uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching invoice"})
		log.Println(err)
		return
	}

	c.JSON(200, invoice)
}

func (s *Service) getInvoicesByClient(c *gin.Context) {

	userID := c.MustGet("userID").(int32)
	clientId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	invoices, err := s.queries.GetInvoicesByClientID(c, pgdb.GetInvoicesByClientIDParams{
		ClientID: uuid,
		OwnerID:  pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching invoices"})
		log.Println(err)
		return
	}

	if invoices == nil {
		c.JSON(404, gin.H{"message": "No invoices found"})
		return
	}

	c.JSON(200, invoices)
}

func (s *Service) deleteInvoice(c *gin.Context) {
	invoiceId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(invoiceId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	err = s.queries.DeleteInvoice(c, uuid)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error deleting invoice"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"message": "Invoice deleted successfully"})
}

func (s *Service) createInvoice(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	var invoice CreateInvoiceRequest
	err := c.ShouldBindJSON(&invoice)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid JSON"})
		return
	}

	// Validate data
	var clientUUID pgtype.UUID
	err = clientUUID.Scan(invoice.ClientID)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid  Client UUID"})
		return
	}

	_, err = s.queries.GetClientByID(c, pgdb.GetClientByIDParams{
		ID:      clientUUID,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	var dueDate time.Time
	err = dueDate.UnmarshalText([]byte(invoice.DueDate))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Due Date"})
		return
	}

	var dateOfIssue time.Time
	if invoice.DateOfIssue == "" {
		log.Println("Date of Issue not provided, using current date")
		dateOfIssue = time.Now()
	} else {
		err = dateOfIssue.UnmarshalText([]byte(invoice.DateOfIssue))
		if err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"message": "Invalid Date of Issue"})
			return
		}
	}

	newInvoice, err := s.queries.CreateInvoice(c, pgdb.CreateInvoiceParams{
		ClientID: clientUUID,
		DueDate: pgtype.Timestamp{
			Time:  dueDate,
			Valid: true,
		},
		DateOfIssue: pgtype.Timestamp{
			Time:  dateOfIssue,
			Valid: true,
		},
		Amount:      pgtype.Int4{Int32: int32(invoice.Amount), Valid: true},
		Description: pgtype.Text{String: invoice.Description, Valid: true},
		OwnerID:     pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating invoice"})
		return
	}

	c.JSON(200, newInvoice)
}

func (s *Service) updateInvoice(c *gin.Context) {

	userID := c.MustGet("userID").(int32)
	var invoice UpdateInvoiceRequest
	err := c.ShouldBindJSON(&invoice)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid JSON"})
		return
	}

	// Validate data
	var invoiceUUID pgtype.UUID
	err = invoiceUUID.Scan(invoice.ID)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Invoice UUID"})
		return
	}

	_, err = s.queries.GetInvoiceByID(c, pgdb.GetInvoiceByIDParams{
		ID:      invoiceUUID,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(404, gin.H{"message": "Invoice not found"})
		return
	}

	var clientUUID pgtype.UUID
	err = clientUUID.Scan(invoice.ClientID)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Client UUID"})
		return
	}

	_, err = s.queries.GetClientByID(c, pgdb.GetClientByIDParams{
		ID:      clientUUID,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	var dueDate time.Time
	err = dueDate.UnmarshalText([]byte(invoice.DueDate))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Due Date"})
		return
	}

	var dateOfIssue time.Time
	if invoice.DateOfIssue == "" {
		log.Println("Date of Issue not provided, using current date")
		dateOfIssue = time.Now()
	} else {
		err = dateOfIssue.UnmarshalText([]byte(invoice.DateOfIssue))
		if err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"message": "Invalid Date of Issue"})
			return
		}
	}

	err = s.queries.UpdateInvoice(c, pgdb.UpdateInvoiceParams{
		ID:       invoiceUUID,
		ClientID: clientUUID,
		DueDate: pgtype.Timestamp{
			Time:  dueDate,
			Valid: true,
		},
		DateOfIssue: pgtype.Timestamp{
			Time:  dateOfIssue,
			Valid: true,
		},
		Amount:      pgtype.Int4{Int32: int32(invoice.Amount), Valid: true},
		Description: pgtype.Text{String: invoice.Description, Valid: true},
		IsPaid:      pgtype.Bool{Bool: *invoice.IsPaid, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error updating invoice"})
		return
	}

	c.JSON(200, gin.H{"message": "Invoice updated successfully"})
}

func (s *Service) generateFake(c *gin.Context) {

	// Generate a fake invoice for the given client

	clientId := c.Param("client_id")

	var uuid_client pgtype.UUID
	err := uuid_client.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	// Skip validation for client (for now)

	// Generate a fake invoice
	var invoiceAmount = rand.Intn(1000)
	newInvoice, err := s.queries.CreateInvoice(c, pgdb.CreateInvoiceParams{
		ClientID: uuid_client,
		DueDate: pgtype.Timestamp{
			Time:  time.Now().AddDate(0, 1, 0),
			Valid: true,
		},
		DateOfIssue: pgtype.Timestamp{
			Time:  time.Now(),
			Valid: true,
		},
		Amount:      pgtype.Int4{Int32: int32(invoiceAmount), Valid: true},
		Description: pgtype.Text{String: "Fake Invoice", Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating invoice"})
		return
	}

	c.JSON(200, newInvoice)
}
