package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"openinvoice-api/apiv1/clients"
	"openinvoice-api/utils"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/apiv1", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to OpenInvoice API!",
		})
	})

	clients.RegisterRoutes(r)

	return r
}

func main() {

	// Generate some mock data
	utils.GenerateData()

	r := setupRouter()

	r.Run() // listen and serve on 0.0.0.0:8080
}
