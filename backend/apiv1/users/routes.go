package users

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

	routes := router.Group("/u")
	{
		routes.GET("/me", middleware.AuthMiddleware(s.queries), s.me)
		routes.POST("/login", s.login)
		routes.POST("/register", s.register)
	}
}
