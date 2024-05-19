CREATE OR REPLACE MATERIALIZED VIEW mv_get_clients AS
LIMIT
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