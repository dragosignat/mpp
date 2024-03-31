package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"openinvoice-api/apiv1/clients"

	"github.com/stretchr/testify/assert"
)

func TestGetClients(t *testing.T) {
	r := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/clients", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGetClient(t *testing.T) {
	r := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/clients/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGetClientsSorting(t *testing.T) {
	r := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/apiv1/clients?sort=asc&sortBy=clientName", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

	for i := 0; i < len(clients.ClientsList)-1; i++ {
		assert.True(t, clients.ClientsList[i].ClientName <= clients.ClientsList[i+1].ClientName)
	}
}

func TestPostClient(t *testing.T) {
	r := setupRouter()

	w := httptest.NewRecorder()
	body := []byte(`
	{
    "clientId": "-1",
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
	r := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/apiv1/clients/1", nil)
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
