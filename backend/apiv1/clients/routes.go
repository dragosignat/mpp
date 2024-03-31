package clients

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

	routes := router.Group("/apiv1/clients")
	{
		routes.GET("", getClients)
		routes.GET("/:id", getClient)
		routes.POST("", createClient)
		routes.PUT("/:id", updateClient)
		routes.DELETE("/:id", deleteClient)
	}

}
