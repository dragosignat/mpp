package clients

import (
	"fmt"
	"log"
	"slices"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
)

func getClients(c *gin.Context) {

	sorting := c.DefaultQuery("sort", "asc")
	sortBy := c.DefaultQuery("sortBy", "none")
	filter := c.DefaultQuery("filter", "none")

	sort.Slice(ClientsList, func(i, j int) bool {
		switch sortBy {
		case "clientName":
			return ClientsList[i].ClientName < ClientsList[j].ClientName
		case "clientEmail":
			return ClientsList[i].ClientEmail < ClientsList[j].ClientEmail
		case "clientTotalPurchases":
			return ClientsList[i].ClientTotalPurchases < ClientsList[j].ClientTotalPurchases
		default:
			return ClientsList[i].ClientID < ClientsList[j].ClientID
		}
	})

	if sorting == "desc" {
		slices.Reverse(ClientsList)
	}

	response := []Clients{}

	if filter == "none" {
		response = ClientsList
	} else {
		for _, client := range ClientsList {
			// If name, email, or phone contains the filter string
			if strings.Contains(client.ClientName, filter) || strings.Contains(client.ClientEmail, filter) || strings.Contains(client.ClientPhone, filter) {
				response = append(response, client)
			}
		}

	}
	c.JSON(200, response)
}

func getClient(c *gin.Context) {
	for _, client := range ClientsList {
		if client.ClientID == c.Param("id") {
			c.JSON(200, client)
			return
		}
	}
}

func deleteClient(c *gin.Context) {
	for i, client := range ClientsList {
		if client.ClientID == c.Param("id") {
			ClientsList = append(ClientsList[:i], ClientsList[i+1:]...)
			c.JSON(200, gin.H{"message": "Client deleted"})
			return
		}
	}
	c.JSON(404, gin.H{"message": "Client not found"})
}

func createClient(c *gin.Context) {
	var newClient Clients

	err := c.BindJSON(&newClient)

	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	for _, client := range ClientsList {
		if client.ClientID == newClient.ClientID {
			c.JSON(400, gin.H{"message": "Client already exists"})
			return
		}
	}

	ClientsList = append(ClientsList, newClient)
	c.JSON(201, newClient)

}

func updateClient(c *gin.Context) {
	var updatedClient Clients

	err := c.BindJSON(&updatedClient)

	if err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	for i, client := range ClientsList {
		if client.ClientID == c.Param("id") {
			ClientsList[i] = updatedClient
			c.JSON(200, updatedClient)
			return
		}
	}

	c.JSON(404, gin.H{"message": "Client not found"})
}
