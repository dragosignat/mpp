package clients

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.RouterGroup) {

	routes := router.Group("/clients")
	{
		routes.GET("", getClients)
		routes.GET("/:id", getClient)
		routes.POST("", createClient)
		routes.PUT("/:id", updateClient)
		routes.DELETE("/:id", deleteClient)
		routes.GET("/watch", watchClients)
	}

}
