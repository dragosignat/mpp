package clients

import (
	"encoding/json"
	"log"
	"os"
)

type Clients struct {
	ClientID             string `json:"clientId" binding:"required"`
	ClientName           string `json:"clientName" binding:"required"`
	ClientEmail          string `json:"clientEmail" binding:"required"`
	ClientPhone          string `json:"clientPhone" binding:"required"`
	ClientAddress        string `json:"clientAddress" binding:"required"`
	ClientTotalPurchases int    `json:"clientTotalPurchases" binding:"required"`
	ClientIsBusiness     *bool  `json:"clientIsBusiness" binding:"required"`
}

var ClientsList []Clients

// Parse the mock data into a slice of Clients
func init() {
	mockDataPath := "apiv1/clients/client_list.json"

	bytes, err := os.ReadFile(mockDataPath)
	if err != nil {
		log.Fatal(err)
	}

	json.Unmarshal(bytes, &ClientsList)

	log.Printf("Loaded %d clients from %s\n", len(ClientsList), mockDataPath)
}
