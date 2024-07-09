package companies

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
	routes := router.Group("/companies")
	routes.Use(middleware.AuthMiddleware(s.queries))
	{
		routes.GET("", s.getCompanies)
		routes.GET("/:id", s.getCompany)
		routes.POST("", s.createCompany)
		routes.PUT("/:id", s.updateCompany)
		routes.DELETE("/:id", s.deleteCompany)
		routes.GET("/search", s.searchCompanies)
	}

}
