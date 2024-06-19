CREATE TABLE campaign(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_processing BOOLEAN NOT NULL DEFAULT TRUE 
);


CREATE TABLE review(
    id SERIAL PRIMARY KEY,
    campaign_id INT NOT NULL,
    sentiment VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id)
);

