-- Clients CRUD operations

-- name: CreateClient :one
INSERT INTO clients (first_name, last_name, email, phone, company_id, position, social_links, birthday, last_contact,
                     notes, preferred_contact_method, owner_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING pid, first_name, last_name, email, phone, company_id, position, social_links, birthday, last_contact, notes, preferred_contact_method, created_at, updated_at;

-- name: GetClients :many
SELECT pid,
       first_name,
       last_name,
       email,
       phone,
       company_id,
       position,
       social_links,
       birthday,
       last_contact,
       notes,
       preferred_contact_method,
       created_at,
       updated_at
FROM clients
WHERE owner_id = $1
ORDER BY last_name, first_name
LIMIT $2 OFFSET $3;

-- name: GetClientByID :one
SELECT pid,
       first_name,
       last_name,
       email,
       phone,
       company_id,
       position,
       social_links,
       birthday,
       last_contact,
       notes,
       preferred_contact_method,
       created_at,
       updated_at
FROM clients
WHERE pid = $1
  AND owner_id = $2;

-- name: UpdateClient :exec
UPDATE clients
SET first_name               = $1,
    last_name                = $2,
    email                    = $3,
    phone                    = $4,
    company_id               = $5,
    position                 = $6,
    social_links             = $7,
    birthday                 = $8,
    last_contact             = $9,
    notes                    = $10,
    preferred_contact_method = $11,
    updated_at               = NOW()
WHERE pid = $12
  AND owner_id = $13;

-- name: DeleteClient :exec
DELETE
FROM clients
WHERE pid = $1
  AND owner_id = $2;

-- name: SearchClients :many
SELECT pid, first_name, last_name, email
FROM clients
WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1)
  AND owner_id = $2
ORDER BY last_name, first_name
LIMIT $3;

-- name: GetTotalNumberOfClients :one
SELECT COUNT(*)
FROM clients
WHERE owner_id = $1;

-- name: GetClientsWithCompanyInfo :many
SELECT c.id,
       c.first_name,
       c.last_name,
       c.email,
       c.phone,
       c.position,
       c.social_links,
       c.birthday,
       c.last_contact,
       c.notes,
       c.preferred_contact_method,
       c.created_at,
       c.updated_at,
       co.name     AS company_name,
       co.industry AS company_industry
FROM clients c
         LEFT JOIN
     companies co ON c.company_id = co.id
WHERE c.owner_id = $1
ORDER BY c.last_name, c.first_name
LIMIT $2 OFFSET $3;
