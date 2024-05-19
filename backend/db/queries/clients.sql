-- name: CreateClient :one
INSERT INTO clients
    (name, email, phone, is_business, address, total_purchases)
VALUES
    ($1, $2, $3, $4, $5, $6)
RETURNING id,
name,
email,
phone,
is_business,
total_purchases,
address;

-- name: GetClients :many
SELECT
    id,
    name,
    email,
    phone,
    is_business,
    total_purchases,
    address,
    created_at,
    updated_at
FROM
    clients;

-- name: GetClientByID :one
SELECT
    id,
    name,
    email,
    phone,
    is_business,
    total_purchases,
    address,
    last_purchase
    created_at,
    updated_at
FROM
    clients
WHERE
    id = $1;

-- name: UpdateClient :exec
UPDATE
    clients
SET
    name = $1,
    email = $2,
    phone = $3,
    is_business = $4,
    last_purchase = $5,
    address = $6,
    total_purchases = $7,
    updated_at = NOW() 
WHERE
    id = $8;

-- name: DeleteClient :exec
DELETE FROM
    clients
WHERE
    id = $1;


-- name: GetClientsWithOutgoingInvoicesAmount :many
SELECT
    c.id,
    c.name,
    c.email,
    c.phone,
    c.is_business,
    c.total_purchases,
    c.address,
    c.created_at,
    c.updated_at,
    COALESCE(SUM(i.amount), 0) as total_outgoing_invoices
FROM
    clients c
LEFT JOIN
    invoices i
ON
    c.id = i.client_id
GROUP BY
    c.id,
    c.name,
    c.email,
    c.phone,
    c.is_business,
    c.total_purchases,
    c.address,
    c.created_at,
    c.updated_at
ORDER BY
    c.id
LIMIT
    $1
OFFSET
    $2;

-- name: GetClientsWithOutgoingInvoicesAmountFull :many
SELECT
    c.id,
    c.name,
    c.email,
    c.phone,
    c.is_business,
    c.total_purchases,
    c.address,
    c.created_at,
    c.updated_at,
    COALESCE(SUM(i.amount), 0) as total_outgoing_invoices
FROM
    clients c
LEFT JOIN
    invoices i
ON
    c.id = i.client_id
GROUP BY
    c.id,
    c.name,
    c.email,
    c.phone,
    c.is_business,
    c.total_purchases,
    c.address,
    c.created_at,
    c.updated_at
ORDER BY
    c.id;

-- name: GetTotalNumberOfClients :one
SELECT
    COUNT(*)
FROM
    clients;
    
-- name: SearchClients :many
SELECT
    id,
    name
FROM 
    clients
WHERE
    name ILIKE $1
ORDER BY
    name
LIMIT
    $2;