package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"openinvoice-api/apiv1/clients"
	"openinvoice-api/internal/pgdb"
)

func setupRouter() *gin.Engine {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	querier := pgdb.New(pgConn)
	// defer pgdb.Close(pgConn)

	clientsService := clients.NewService(querier)

	// Setup the router
	r := gin.Default()
	r.Use(cors.Default())

	superGroup := r.Group("/apiv1")
	{
		clientsService.RegisterRoutes(superGroup)
	}

	r.GET("/apiv1", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to OpenInvoice API!",
		})
	})

	return r
}

func main() {

	r := setupRouter()

	r.Run() // listen and serve on 0.0.0.0:8080
}
