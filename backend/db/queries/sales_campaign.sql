-- name: CreateSalesScript :one
INSERT INTO
    sales_scripts (title, type, subject, body, owner_id)
VALUES
    (
        $1,
        $2,
        $3,
        $4,
        $5
    ) RETURNING id,
    title,
    type,
    subject,
    body;

-- name: GetSalesScripts :many
SELECT id,
       title,
       type,
       subject,
       body
FROM sales_scripts
WHERE owner_id = $1
ORDER BY title;

-- name: GetSalesScriptsByType :many
SELECT id,
       title,
       type,
       subject,
       body
FROM sales_scripts
WHERE owner_id = $1
  AND type = $2
ORDER BY title;

-- name: GetSalesScriptByID :one
SELECT id,
       title,
       type,
       subject,
       body
FROM sales_scripts
WHERE id = $1
  AND owner_id = $2;

-- name: CreateSalesCampaign :one
INSERT INTO
    sales_campaigns (name, type, script_id, owner_id)
VALUES
    (
        $1,
        $2,
        $3,
        $4
    ) RETURNING id,
    type,
    name,
    script_id;

-- name: GetSalesCampaigns :many
SELECT id,
       name,
       type,
       script_id
FROM sales_campaigns
WHERE owner_id = $1
ORDER BY name;

-- name: AddLeadToSalesCampaign :exec
INSERT INTO
    sales_campaign_leads (campaign_id, lead_id, owner_id)
VALUES
    (
        $1,
        $2,
        $3
    );

-- name: GetLeadsByCampaign :many
SELECT leads.email, leads.first_name, leads.last_name, leads.phone
FROM leads
JOIN sales_campaign_leads ON leads.id = sales_campaign_leads.lead_id
WHERE sales_campaign_leads.campaign_id = $1
  AND sales_campaign_leads.owner_id = $2;