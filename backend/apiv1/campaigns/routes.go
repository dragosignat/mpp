package campaigns

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

	routes := router.Group("/campaigns")
	routes.Use(middleware.AuthMiddleware(s.queries))
	{
		routes.GET("", s.List)
		// routes.POST("", s.Create)
		routes.GET("/:id", s.Get)
	}

}
