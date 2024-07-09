package leads

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

	routes := router.Group("/leads")
	routes.Use(middleware.AuthMiddleware(s.queries))
	{
		routes.GET("", s.getLeads)
		routes.GET("/:id", s.getLead)
		routes.POST("", s.createLead)
		routes.PUT("/:id", s.updateLead)
		routes.DELETE("/:id", s.deleteLead)
		routes.GET("/search", s.searchLeads)
	}

}
