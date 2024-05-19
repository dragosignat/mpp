-- name: CreateInvoice :one
INSERT INTO invoices
    (client_id, amount, date_of_issue, due_date, description)
VALUES
    ($1, $2, $3, $4, $5)
RETURNING id,
    client_id,
    amount,
    date_of_issue,
    due_date,
    description,
    is_paid,
    created_at,
    updated_at;

-- name: GetInvoices :many
SELECT
    i.id as id,
    c.name as client_id,
    i.amount,
    i.date_of_issue,
    i.due_date,
    i.description,
    i.is_paid,
    i.created_at,
    i.updated_at
FROM
    invoices i
JOIN clients c ON i.client_id = c.id;
    
-- name: GetInvoiceByID :one
SELECT
    id,
    client_id,
    amount,
    date_of_issue,
    due_date,
    description,
    is_paid,
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
    amount,
    date_of_issue,
    due_date,
    description,
    is_paid,
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
    amount = $2,
    date_of_issue = $3,
    due_date = $4,
    description = $5,
    is_paid = $6,
    updated_at = NOW()
WHERE
    id = $7;

-- name: DeleteInvoice :exec
DELETE FROM
    invoices
WHERE
    id = $1;