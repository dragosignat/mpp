package companies

import "openinvoice-api/utils"

type CompanyCreate struct {
	Name          string        `json:"name" binding:"required"`
	Industry      string        `json:"industry" binding:"required"`
	Size          string        `json:"size" binding:"required"`
	Website       string        `json:"website" binding:"required"`
	ContactPerson string        `json:"contact_person" binding:"required"`
	Email         string        `json:"email" binding:"required"`
	Phone         string        `json:"phone" binding:"required"`
	Address       utils.Address `json:"address" binding:"required"`
}
