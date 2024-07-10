package kanban

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
	routes := router.Group("/kanban")
	routes.Use(middleware.AuthMiddleware(s.queries))
	{
		routes.GET("", s.getBoard)
		routes.POST("", s.postTask)
		routes.PUT("/:id", s.updateTask)
		routes.DELETE("/:id", s.deleteTask)
	}

}
