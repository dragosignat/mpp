package clients

import (
	"openinvoice-api/internal/middleware"
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
	routes.Use(middleware.AuthMiddleware(s.queries))
	{
		routes.GET("", s.getClients)
		routes.GET("/:id", s.getClient)
		routes.POST("", s.createClient)
		routes.PUT("/:id", s.updateClient)
		routes.DELETE("/:id", s.deleteClient)
		// routes.GET("/generate-fake-client", s.generateFake)
		// routes.GET("/get-total-clients", s.getTotalClients)
		routes.GET("/search", s.searchClients)
	}

}
