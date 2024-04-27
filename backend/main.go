package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"openinvoice-api/apiv1/clients"
	"openinvoice-api/apiv1/invoices"
	"openinvoice-api/internal/pgdb"
)

func setupRouter(pgConn *pgxpool.Pool) *gin.Engine {
	querier := pgdb.New(pgConn)

	clientsService := clients.NewService(querier)
	invoicesService := invoices.NewService(querier)

	// Setup the router
	r := gin.Default()
	r.Use(cors.Default())

	superGroup := r.Group("/apiv1")
	{
		clientsService.RegisterRoutes(superGroup)
		invoicesService.RegisterRoutes(superGroup)
	}

	r.GET("/apiv1", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to OpenInvoice API!",
		})
	})

	return r
}

func main() {
	pgConn, err := pgdb.Connect()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	defer pgdb.Close(pgConn)

	r := setupRouter(pgConn)

	r.Run() // listen and serve on 0.0.0.0:8080
}
