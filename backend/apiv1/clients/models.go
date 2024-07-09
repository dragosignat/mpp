package clients

import "openinvoice-api/utils"

type ClientCreate struct {
	FirstName              string            `json:"first_name" binding:"required"`
	LastName               string            `json:"last_name" binding:"required"`
	Email                  string            `json:"email" binding:"required"`
	Phone                  string            `json:"phone" binding:"required"`
	CompanyID              int               `json:"company_id" binding:"required"`
	Position               string            `json:"position" binding:"required"`
	SocialLink             utils.SocialLinks `json:"social_links"`
	BirthDate              string            `json:"birth_date"`
	LastContact            string            `json:"last_contact"`
	Notes                  string            `json:"notes"`
	PreferredContactMethod string            `json:"preferred_contact_method"`
}
