package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"

	"openinvoice-api/apiv1/campaigns"
	"openinvoice-api/apiv1/clients"
	"openinvoice-api/apiv1/companies"
	"openinvoice-api/apiv1/kanban"
	"openinvoice-api/apiv1/leads"
	"openinvoice-api/apiv1/users"
	docs "openinvoice-api/docs"
	"openinvoice-api/internal/pgdb"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func setupRouter(pgConn *pgxpool.Pool) *gin.Engine {
	querier := pgdb.New(pgConn)

	clientsService := clients.NewService(querier)
	companiesService := companies.NewService(querier)
	leadsService := leads.NewService(querier)
	usersService := users.NewService(querier)
	campaignsService := campaigns.NewService(querier)
	kanbanService := kanban.NewService(querier)

	// Setup the router
	r := gin.Default()
	docs.SwaggerInfo.BasePath = "/apiv1"
	corsConfig := cors.Config{
		AllowOrigins:     []string{"*"}, // Adjust this to your front-end URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}
	r.Use(cors.New(corsConfig))

	superGroup := r.Group("/apiv1")
	{
		clientsService.RegisterRoutes(superGroup)
		usersService.RegisterRoutes(superGroup)
		campaignsService.RegisterRoutes(superGroup)
		companiesService.RegisterRoutes(superGroup)
		leadsService.RegisterRoutes(superGroup)
		kanbanService.RegisterRoutes(superGroup)
	}

	r.GET("/apiv1", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to OpenInvoice API!",
		})
	})
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

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
