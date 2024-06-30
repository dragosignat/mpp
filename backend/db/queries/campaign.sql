-- name: CreateCampaign :one
INSERT INTO
    campaign(
        name,
        description,
        owner_id
    )
VALUES
    ($1, $2, $3)
RETURNING
    id,
    name,
    description,
    created_at,
    updated_at,
    is_active,
    is_processing;

-- name: GetCampaigns :many
SELECT
    c.id,
    c.name,
    c.description,
    c.created_at,
    c.updated_at,
    c.is_active,
    c.is_processing,
    COUNT(r.id) as review_count
FROM
    campaign c
LEFT JOIN
    review r
ON
    c.id = r.campaign_id
WHERE
    owner_id = $1
GROUP BY
    c.id,
    c.name,
    c.description,
    c.created_at,
    c.updated_at,
    c.owner_id,
    c.is_active,
    c.is_processing;

-- name: GetCampaignByID :one
SELECT
    c.id,
    c.name,
    c.description,
    c.created_at,
    c.updated_at,
    c.is_active,
    c.is_processing,
    COUNT(r.id) as review_count
FROM
    campaign c
LEFT JOIN
    review r
ON
    c.id = r.campaign_id
WHERE
    c.id = $1
    AND
    c.owner_id = $2
GROUP BY
    c.id,
    c.name,
    c.description,
    c.created_at,
    c.updated_at,
    c.owner_id,
    c.is_active,
    c.is_processing;

-- name: GetReviewsByCampaignID :many
SELECT
    r.id,
    r.campaign_id,
    r.sentiment,
    r.review,
    r.created_at,
    r.updated_at
FROM
    review r
WHERE
    r.campaign_id = $1;

-- name: GetSentimentCountByCampaignID :one
SELECT
    COUNT(r.id) as positive_count
FROM
    review r
WHERE
    r.campaign_id = $1
    AND
    r.sentiment = $2;
