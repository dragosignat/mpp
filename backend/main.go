package main

import (
	"github.com/gin-gonic/gin"

	"openinvoice-api/apiv1/clients"
)

type Clients struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	r := gin.Default()

	clients.RegisterRoutes(r)

	r.Run() // listen and serve on 0.0.0.0:8080
}
