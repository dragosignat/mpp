// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package pgdb

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Campaign struct {
	ID           int32            `json:"id"`
	Name         string           `json:"name"`
	Description  pgtype.Text      `json:"description"`
	CreatedAt    pgtype.Timestamp `json:"created_at"`
	UpdatedAt    pgtype.Timestamp `json:"updated_at"`
	OwnerID      pgtype.Int4      `json:"owner_id"`
	IsActive     bool             `json:"is_active"`
	IsProcessing bool             `json:"is_processing"`
}

type Clients struct {
	ID                     int32            `json:"id"`
	Pid                    pgtype.UUID      `json:"pid"`
	FirstName              string           `json:"first_name"`
	LastName               string           `json:"last_name"`
	Email                  pgtype.Text      `json:"email"`
	Phone                  pgtype.Text      `json:"phone"`
	CompanyID              pgtype.Int4      `json:"company_id"`
	Position               pgtype.Text      `json:"position"`
	SocialLinks            []byte           `json:"social_links"`
	Birthday               pgtype.Date      `json:"birthday"`
	LastContact            pgtype.Timestamp `json:"last_contact"`
	Notes                  pgtype.Text      `json:"notes"`
	PreferredContactMethod pgtype.Text      `json:"preferred_contact_method"`
	CreatedAt              pgtype.Timestamp `json:"created_at"`
	UpdatedAt              pgtype.Timestamp `json:"updated_at"`
	OwnerID                pgtype.Int4      `json:"owner_id"`
}

type Companies struct {
	ID            int32            `json:"id"`
	Pid           pgtype.UUID      `json:"pid"`
	Name          string           `json:"name"`
	Industry      pgtype.Text      `json:"industry"`
	Size          pgtype.Text      `json:"size"`
	Website       pgtype.Text      `json:"website"`
	ContactPerson pgtype.Text      `json:"contact_person"`
	Email         pgtype.Text      `json:"email"`
	Phone         pgtype.Text      `json:"phone"`
	Address       []byte           `json:"address"`
	CreatedAt     pgtype.Timestamp `json:"created_at"`
	UpdatedAt     pgtype.Timestamp `json:"updated_at"`
	OwnerID       pgtype.Int4      `json:"owner_id"`
}

type Kanban struct {
	ID         int32            `json:"id"`
	Title      string           `json:"title"`
	ColumnType string           `json:"column_type"`
	CreatedAt  pgtype.Timestamp `json:"created_at"`
	UpdatedAt  pgtype.Timestamp `json:"updated_at"`
	OwnerID    pgtype.Int4      `json:"owner_id"`
}

type Leads struct {
	ID                     int32            `json:"id"`
	Pid                    pgtype.UUID      `json:"pid"`
	FirstName              string           `json:"first_name"`
	LastName               string           `json:"last_name"`
	Email                  pgtype.Text      `json:"email"`
	Phone                  pgtype.Text      `json:"phone"`
	CompanyID              pgtype.Int4      `json:"company_id"`
	Position               pgtype.Text      `json:"position"`
	SocialLinks            []byte           `json:"social_links"`
	Birthday               pgtype.Date      `json:"birthday"`
	LastContact            pgtype.Timestamp `json:"last_contact"`
	FirstContact           pgtype.Timestamp `json:"first_contact"`
	FollowUp               pgtype.Timestamp `json:"follow_up"`
	Source                 pgtype.Text      `json:"source"`
	Notes                  pgtype.Text      `json:"notes"`
	LeadStatus             pgtype.Text      `json:"lead_status"`
	PreferredContactMethod pgtype.Text      `json:"preferred_contact_method"`
	LeadScore              pgtype.Int4      `json:"lead_score"`
	CreatedAt              pgtype.Timestamp `json:"created_at"`
	UpdatedAt              pgtype.Timestamp `json:"updated_at"`
	OwnerID                pgtype.Int4      `json:"owner_id"`
}

type Review struct {
	ID         int32            `json:"id"`
	CampaignID int32            `json:"campaign_id"`
	Sentiment  string           `json:"sentiment"`
	Review     string           `json:"review"`
	CreatedAt  pgtype.Timestamp `json:"created_at"`
	UpdatedAt  pgtype.Timestamp `json:"updated_at"`
}

type Users struct {
	ID        int32            `json:"id"`
	Username  string           `json:"username"`
	Email     string           `json:"email"`
	Password  string           `json:"password"`
	CreatedAt pgtype.Timestamp `json:"created_at"`
	UpdatedAt pgtype.Timestamp `json:"updated_at"`
	IsActive  bool             `json:"is_active"`
}
