-- name: CreateTask :one
INSERT INTO kanban(
    title,
    column_type,
    owner_id ) 
VALUES ( $1, $2, $3) RETURNING
id,
title,
column_type;

-- name: GetBoard :many
SELECT
id,
title,
column_type
FROM
kanban
WHERE
owner_id = $1;

-- name: DeleteTask :exec
DELETE FROM kanban
WHERE
id = $1
AND owner_id = $2;

-- name: UpdateTask :exec
UPDATE kanban
SET title = $1,
column_type = $2,
updated_at = NOW()
WHERE
id = $3
AND owner_id = $4;
