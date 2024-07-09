package leads

import "openinvoice-api/utils"

type LeadCreate struct {
	FirstName              string            `json:"first_name" binding:"required"`
	LastName               string            `json:"last_name" binding:"required"`
	Email                  string            `json:"email" binding:"required"`
	Phone                  string            `json:"phone" binding:"required"`
	CompanyID              int               `json:"company_id" binding:"required"`
	Position               string            `json:"position" binding:"required"`
	Notes                  string            `json:"notes"`
	PreferredContactMethod string            `json:"preferred_contact_method"`
	Source                 string            `json:"source"`
	SocialLinks            utils.SocialLinks `json:"social_links"`
}
