-- name: CreateUser :one
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
RETURNING id, username, email, created_at, updated_at;

-- name: GetUserByID :one
SELECT *
FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT *
FROM users
WHERE email = $1;

-- name: GetUserByUsername :one
SELECT *
FROM users
WHERE username = $1;

-- name: GetUsers :many
SELECT *
FROM users;

-- name: UpdateUser :exec
UPDATE users
SET
    username = $1,
    email = $2,
    password = $3,
    updated_at = NOW()
WHERE id = $4;

-- name: DeleteUser :exec
UPDATE users
SET is_active = FALSE
WHERE id = $1;

-- name: ActivateUser :exec
UPDATE users
SET is_active = TRUE
WHERE id = $1;
