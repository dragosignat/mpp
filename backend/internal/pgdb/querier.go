// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package pgdb

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

type Querier interface {
	CreateClient(ctx context.Context, arg CreateClientParams) (CreateClientRow, error)
	CreateInvoice(ctx context.Context, arg CreateInvoiceParams) (CreateInvoiceRow, error)
	DeleteClient(ctx context.Context, id pgtype.UUID) error
	DeleteInvoice(ctx context.Context, id pgtype.UUID) error
	GetClientByID(ctx context.Context, id pgtype.UUID) (GetClientByIDRow, error)
	GetClients(ctx context.Context) ([]GetClientsRow, error)
	GetClientsWithOutgoingInvoicesAmount(ctx context.Context, arg GetClientsWithOutgoingInvoicesAmountParams) ([]GetClientsWithOutgoingInvoicesAmountRow, error)
	GetClientsWithOutgoingInvoicesAmountFull(ctx context.Context) ([]GetClientsWithOutgoingInvoicesAmountFullRow, error)
	GetInvoiceByID(ctx context.Context, id pgtype.UUID) (GetInvoiceByIDRow, error)
	GetInvoices(ctx context.Context) ([]GetInvoicesRow, error)
	GetInvoicesByClientID(ctx context.Context, clientID pgtype.UUID) ([]GetInvoicesByClientIDRow, error)
	GetTotalNumberOfClients(ctx context.Context) (int64, error)
	SearchClients(ctx context.Context, arg SearchClientsParams) ([]SearchClientsRow, error)
	UpdateClient(ctx context.Context, arg UpdateClientParams) error
	UpdateInvoice(ctx context.Context, arg UpdateInvoiceParams) error
}

var _ Querier = (*Queries)(nil)
