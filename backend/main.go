package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"openinvoice-api/apiv1/clients"
)

type Clients struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	clients.RegisterRoutes(r)

	return r
}

func main() {
	r := setupRouter()

	r.Run() // listen and serve on 0.0.0.0:8080
}
