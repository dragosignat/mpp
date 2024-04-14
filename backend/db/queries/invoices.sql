-- name: CreateInvoice :one
INSERT INTO invoices
    (client_id, total_amount, date_of_issue, due_date, description)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING id,
    client_id,
    total_amount,
    date_of_issue,
    due_date,
    description,
    created_at,
    updated_at;

-- name: GetInvoices :many
SELECT
    id,
    client_id,
    total_amount,
    date_of_issue,
    due_date,
    description,
    created_at,
    updated_at
FROM
    invoices;

-- name: GetInvoiceByID :one
SELECT 
    id,
    client_id,
    total_amount,
    date_of_issue,
    due_date,
    description,
    created_at,
    updated_at
FROM
    invoices
WHERE
    id = $1;

-- name: GetInvoicesByClientID :many
SELECT
    id,
    client_id,
    total_amount,
    date_of_issue,
    due_date,
    description,
    created_at,
    updated_at
FROM
    invoices
WHERE
    client_id = $1;

-- name: UpdateInvoice :exec
UPDATE
    invoices
SET
    client_id = $1,
    total_amount = $2,
    date_of_issue = $3,
    due_date = $4,
    description = $5,
    updated_at = NOW()
WHERE
    id = $6;

-- name: DeleteInvoice :exec
DELETE FROM
    invoices
WHERE
    id = $1;