package clients

import (
	"github.com/gin-gonic/gin"
)

func getClients(c *gin.Context) {
	c.JSON(200, ClientsList)
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
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	for i, client := range ClientsList {
		if client.ClientID == c.Param("id") {
			ClientsList[i] = updatedClient
			c.JSON(200, gin.H{"message": "Client updated"})
			return
		}
	}

	c.JSON(404, gin.H{"message": "Client not found"})
}
