package invoices

import (
	"log"
	"openinvoice-api/internal/pgdb"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getInvoices(c *gin.Context) {

	invoices, err := s.queries.GetInvoices(c)

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

	invoiceId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(invoiceId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	invoice, err := s.queries.GetInvoiceByID(c, uuid)

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching invoice"})
		log.Println(err)
		return
	}

	c.JSON(200, invoice)
}

func (s *Service) getInvoicesByClient(c *gin.Context) {

	clientId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(clientId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	invoices, err := s.queries.GetInvoicesByClientID(c, uuid)

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

	_, err = s.queries.GetClientByID(c, clientUUID)
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	var dueDate pgtype.Timestamp
	err = dueDate.Scan(invoice.DueDate)
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
			c.JSON(400, gin.H{"message": "Invalid Date of Issue"})
			return
		}
	}

	newInvoice, err := s.queries.CreateInvoice(c, pgdb.CreateInvoiceParams{
		ClientID: clientUUID,
		DueDate:  dueDate,
		DateOfIssue: pgtype.Timestamp{
			Time:  dateOfIssue,
			Valid: true,
		},
		TotalAmount: pgtype.Int4{Int32: int32(invoice.Amount), Valid: true},
		Description: pgtype.Text{String: invoice.Description, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating invoice"})
		return
	}

	c.JSON(200, newInvoice)
}

func (s *Service) updateInvoice(c *gin.Context) {

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

	_, err = s.queries.GetInvoiceByID(c, invoiceUUID)
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

	_, err = s.queries.GetClientByID(c, clientUUID)
	if err != nil {
		c.JSON(404, gin.H{"message": "Client not found"})
		return
	}

	var dueDate pgtype.Timestamp
	err = dueDate.Scan(invoice.DueDate)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Due Date"})
		return
	}

	var dateOfIssue pgtype.Timestamp
	err = dateOfIssue.Scan(invoice.DateOfIssue)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Date of Issue"})
		return
	}

	err = s.queries.UpdateInvoice(c, pgdb.UpdateInvoiceParams{
		ID:          invoiceUUID,
		ClientID:    clientUUID,
		DueDate:     dueDate,
		DateOfIssue: dateOfIssue,
		TotalAmount: pgtype.Int4{Int32: int32(invoice.Amount), Valid: true},
		Description: pgtype.Text{String: invoice.Description, Valid: true},
		IsPaid:      pgtype.Bool{Bool: *invoice.IsPaid, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error updating invoice"})
		return
	}

	c.JSON(200, gin.H{"message": "Invoice updated successfully"})
}
