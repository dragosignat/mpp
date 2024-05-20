// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package pgdb

import (
	"github.com/jackc/pgx/v5/pgtype"
)

type Clients struct {
	ID             pgtype.UUID      `json:"id"`
	Name           string           `json:"name"`
	Email          pgtype.Text      `json:"email"`
	Phone          pgtype.Text      `json:"phone"`
	Address        pgtype.Text      `json:"address"`
	TotalPurchases pgtype.Int4      `json:"total_purchases"`
	IsBusiness     pgtype.Bool      `json:"is_business"`
	LastPurchase   pgtype.Timestamp `json:"last_purchase"`
	CreatedAt      pgtype.Timestamp `json:"created_at"`
	UpdatedAt      pgtype.Timestamp `json:"updated_at"`
	OwnerID        pgtype.Int4      `json:"owner_id"`
}

type Invoices struct {
	ID          pgtype.UUID      `json:"id"`
	ClientID    pgtype.UUID      `json:"client_id"`
	Amount      pgtype.Int4      `json:"amount"`
	DateOfIssue pgtype.Timestamp `json:"date_of_issue"`
	DueDate     pgtype.Timestamp `json:"due_date"`
	Description pgtype.Text      `json:"description"`
	CreatedAt   pgtype.Timestamp `json:"created_at"`
	UpdatedAt   pgtype.Timestamp `json:"updated_at"`
	OwnerID     pgtype.Int4      `json:"owner_id"`
	IsPaid      pgtype.Bool      `json:"is_paid"`
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
