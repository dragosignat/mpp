package leads

import "openinvoice-api/utils"

type LeadCreate struct {
	FirstName              string            `json:"first_name" binding:"required"`
	LastName               string            `json:"last_name" binding:"required"`
	Email                  string            `json:"email" binding:"required"`
	Source                 string            `json:"source" binding:"required"`
	Phone                  string            `json:"phone"`
	CompanyID              int               `json:"company_id"`
	Position               string            `json:"position"`
	Notes                  string            `json:"notes"`
	PreferredContactMethod string            `json:"preferred_contact_method"`
	SocialLinks            utils.SocialLinks `json:"social_links"`
	Birthday               string            `json:"birthday"`
}
