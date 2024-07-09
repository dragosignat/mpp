-- Leads CRUD operations

-- name: CreateLead :one
INSERT INTO leads (first_name, last_name, email, phone, company_id, position, social_links, birthday, last_contact,
                   first_contact, follow_up, source, notes, lead_status, preferred_contact_method, lead_score, owner_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17) RETURNING pid, first_name, last_name, email, phone, company_id, position, social_links, birthday, last_contact, first_contact, follow_up, source, notes, lead_status, preferred_contact_method, lead_score, created_at, updated_at;

-- name: GetLeads :many
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
       first_contact,
       follow_up,
       source,
       notes,
       lead_status,
       preferred_contact_method,
       lead_score,
       created_at,
       updated_at
FROM leads
WHERE owner_id = $1
ORDER BY last_contact DESC LIMIT $2
OFFSET $3;

-- name: GetLeadByID :one
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
       first_contact,
       follow_up,
       source,
       notes,
       lead_status,
       preferred_contact_method,
       lead_score,
       created_at,
       updated_at
FROM leads
WHERE pid = $1
  AND owner_id = $2;

-- name: UpdateLead :exec
UPDATE leads
SET first_name               = $1,
    last_name                = $2,
    email                    = $3,
    phone                    = $4,
    company_id               = $5,
    position                 = $6,
    social_links             = $7,
    birthday                 = $8,
    last_contact             = $9,
    first_contact            = $10,
    follow_up                = $11,
    source                   = $12,
    notes                    = $13,
    lead_status              = $14,
    preferred_contact_method = $15,
    lead_score               = $16,
    updated_at               = NOW()
WHERE pid = $17
  AND owner_id = $18;

-- name: DeleteLead :exec
DELETE
FROM leads
WHERE pid = $1
  AND owner_id = $2;

-- name: SearchLeads :many
SELECT pid, first_name, last_name, email
FROM leads
WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1)
  AND owner_id = $2
ORDER BY last_name, first_name LIMIT $3;