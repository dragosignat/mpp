package utils

import (
	"math/rand"

	"openinvoice-api/apiv1/clients"

	"github.com/go-faker/faker/v4"
)

func GenerateData() clients.Client {

	maxPurchase := 30000
	minPurchase := 1000

	newClientPerson := clients.Client{
		ID:             faker.UUIDDigit(),
		Name:           faker.Name(),
		Email:          faker.Email(),
		Phone:          faker.TollFreePhoneNumber(),
		Address:        faker.GetRealAddress().Address + ", " + faker.GetRealAddress().City + ", " + faker.GetRealAddress().State,
		TotalPurchases: (rand.Intn(maxPurchase-minPurchase+1) + minPurchase),
		IsBusiness:     (rand.Intn(2)%2 == 0),
	}

	return newClientPerson
}
