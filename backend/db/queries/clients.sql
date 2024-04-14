-- name: CreateClient :one
INSERT INTO clients
    (name, email, phone, is_bussiness)
VALUES
    ($1, $2, $3, $4)
RETURNING id,
name,
email,
phone,
is_bussiness;

-- name: GetClients :many
SELECT
    id,
    name,
    email,
    phone,
    is_bussiness,
    last_purchase
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
    updated_at = NOW() 
WHERE
    id = $6;

-- name: DeleteClient :exec
DELETE FROM
    clients
WHERE
    id = $1;
