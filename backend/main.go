package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"openinvoice-api/apiv1/clients"
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
	r := setupRouter()

	r.Run() // listen and serve on 0.0.0.0:8080
}