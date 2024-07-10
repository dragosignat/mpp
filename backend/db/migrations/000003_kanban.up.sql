CREATE TABLE
    kanban (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        column_type TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        owner_id INT
    );

ALTER TABLE kanban ADD FOREIGN KEY (owner_id) REFERENCES users (id);