-- name: CreateClient :one
INSERT INTO clients
    (name, email, phone, is_bussiness, address, total_purchases)
VALUES
    ($1, $2, $3, $4, $5, $6)
RETURNING id,
name,
email,
phone,
is_bussiness,
total_purchases,
address;

-- name: GetClients :many
SELECT
    id,
    name,
    email,
    phone,
    is_bussiness,
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
    is_bussiness,
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
    is_bussiness = $4,
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
