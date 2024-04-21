package main

import (
	"bytes"
	"log"
	"net/http"
	"net/http/httptest"
	"openinvoice-api/internal/pgdb"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetClients(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/clients", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGetClient(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/clients/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestPostClient(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)
	w := httptest.NewRecorder()
	body := []byte(`
	{
    "clientName": "John Doe",
    "clientEmail": "john@company1.com",
    "clientPhone": "123-456-7890",
    "clientAddress": "123 Main St, Anytown, USA",
    "clientTotalPurchases": 1000,
    "clientIsBusiness": false
	}
	`)
	req, _ := http.NewRequest("POST", "/apiv1/clients", bytes.NewBuffer(body))

	r.ServeHTTP(w, req)

	assert.Equal(t, 201, w.Code)

	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/apiv1/clients", bytes.NewBuffer(body))
	r.ServeHTTP(w, req)

	assert.Equal(t, 400, w.Code)
}

func TestDelete(t *testing.T) {

	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/apiv1/clients/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGetInvoices(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/invoices", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGetInvoice(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/invoices/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestPostInvoice(t *testing.T) {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)
	w := httptest.NewRecorder()
	body := []byte(`
	{
	"clientId": "",
	"dueDate": "2021-12-31",
	"dateOfIssue": "2021-01-01",
	"amount": 1000,
	"description": "Test Invoice"
	}
	`)
	req, _ := http.NewRequest("POST", "/apiv1/invoices", bytes.NewBuffer(body))

	r.ServeHTTP(w, req)

	assert.Equal(t, 201, w.Code)

	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/apiv1/invoices", bytes.NewBuffer(body))
	r.ServeHTTP(w, req)

	assert.Equal(t, 400, w.Code)
}

func TestDeleteInvoice(t *testing.T) {

	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/apiv1/invoices/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
