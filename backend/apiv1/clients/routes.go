package clients

import (
	"openinvoice-api/internal/pgdb"

	"github.com/gin-gonic/gin"
)

type Service struct {
	queries *pgdb.Queries
}

func NewService(queries *pgdb.Queries) *Service {
	return &Service{queries: queries}
}

func (s *Service) RegisterRoutes(router *gin.RouterGroup) {

	routes := router.Group("/clients")
	{
		routes.GET("", getClients)
		routes.GET("/:id", getClient)
		routes.POST("", createClient)
		routes.PUT("/:id", updateClient)
		routes.DELETE("/:id", deleteClient)
	}

}
