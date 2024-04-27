package clients

import (
	"math/rand"

	"github.com/go-faker/faker/v4"
)

func GeneratePerson() Client {

	maxPurchase := 30000
	minPurchase := 1000

	newClientPerson := Client{
		ID:             faker.UUIDDigit(),
		Name:           faker.Name(),
		Email:          faker.Email(),
		Phone:          faker.TollFreePhoneNumber(),
		Address:        faker.GetRealAddress().Address + ", " + faker.GetRealAddress().City + ", " + faker.GetRealAddress().State,
		TotalPurchases: (rand.Intn(maxPurchase-minPurchase+1) + minPurchase),
		IsBusiness:     false,
	}

	return newClientPerson
}
