-- Companies CRUD operations

-- name: CreateCompany :one
INSERT INTO companies (name, industry, size, website, contact_person, email, phone, address, owner_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8,
        $9) RETURNING pid, name, industry, size, website, contact_person, email, phone, address, created_at, updated_at;

-- name: GetCompanies :many
SELECT pid, name, industry, size, website, contact_person, email, phone, address, created_at, updated_at
FROM companies
WHERE owner_id = $1
ORDER BY name
    LIMIT $2
OFFSET $3;

-- name: GetCompanyByID :one
SELECT pid, name, industry, size, website, contact_person, email, phone, address, created_at, updated_at
FROM companies
WHERE pid = $1 AND owner_id = $2;

-- name: UpdateCompany :exec
UPDATE companies
SET name           = $1,
    industry       = $2,
    size           = $3,
    website        = $4,
    contact_person = $5,
    email          = $6,
    phone          = $7,
    address        = $8,
    updated_at     = NOW()
WHERE pid = $9
  AND owner_id = $10;

-- name: DeleteCompany :exec
DELETE
FROM companies
WHERE pid = $1
  AND owner_id = $2;

-- name: SearchCompanies :many
SELECT pid, name
FROM companies
WHERE name ILIKE $1 AND owner_id = $2
ORDER BY name
    LIMIT $3;
  
-- name: GetTotalNumberOfCompanies :one
SELECT COUNT(*)
FROM companies
WHERE owner_id = $1;