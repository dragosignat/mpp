CREATE TABLE
    sales_scripts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        subject TEXT,
        body TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        owner_id INT NOT NULL
    );

ALTER TABLE sales_scripts ADD FOREIGN KEY (owner_id) REFERENCES users (id);

CREATE TABLE
    sales_campaigns (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        script_id INT,
        date_start DATE NOT NULL DEFAULT CURRENT_DATE,
        date_end DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        owner_id INT NOT NULL
    );

ALTER TABLE sales_campaigns ADD FOREIGN KEY (script_id) REFERENCES sales_scripts (id);

ALTER TABLE sales_campaigns ADD FOREIGN KEY (owner_id) REFERENCES users (id);

CREATE TABLE
    sales_campaign_leads (
        id SERIAL PRIMARY KEY,
        campaign_id INT,
        lead_id INT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        owner_id INT NOT NULL
    );

ALTER TABLE sales_campaign_leads ADD FOREIGN KEY (campaign_id) REFERENCES sales_campaigns (id);

ALTER TABLE sales_campaign_leads ADD FOREIGN KEY (lead_id) REFERENCES leads (id);

ALTER TABLE sales_campaign_leads ADD FOREIGN KEY (owner_id) REFERENCES users (id);