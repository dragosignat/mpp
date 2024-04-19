package invoices

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

	routes := router.Group("/invoices")
	{
		routes.GET("", s.getInvoices)
		routes.GET("/:id", s.getInvoice)
		routes.GET("/client/:id", s.getInvoicesByClient)
		routes.POST("", s.createInvoice)
		routes.PUT("/:id", s.updateInvoice)
		routes.DELETE("/:id", s.deleteInvoice)
		routes.GET("/generate-fake-client", s.generateFake)
	}

}
