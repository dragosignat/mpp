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
		ClientID:             faker.UUIDDigit(),
		ClientName:           faker.Name(),
		ClientEmail:          faker.Email(),
		ClientPhone:          faker.TollFreePhoneNumber(),
		ClientAddress:        faker.GetRealAddress().Address + ", " + faker.GetRealAddress().City + ", " + faker.GetRealAddress().State,
		ClientTotalPurchases: (rand.Intn(maxPurchase-minPurchase+1) + minPurchase),
		ClientIsBusiness:     (rand.Intn(2)%2 == 0),
	}

	return newClientPerson
}
