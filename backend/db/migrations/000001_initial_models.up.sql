CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN NOT NULL DEFAULT TRUE
    );

CREATE TABLE
    IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        -- pid is the public id of an entity (what we expose to the client)
        pid UUID UNIQUE DEFAULT (uuid_generate_v4 ()),
        name TEXT UNIQUE NOT NULL,
        industry TEXT,
        size TEXT,
        website TEXT,
        contact_person TEXT,
        email TEXT,
        phone TEXT,
        -- address is a JSON object
        address JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_id INT
    );

ALTER TABLE companies ADD FOREIGN KEY (owner_id) REFERENCES users (id);

CREATE TABLE
    IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        pid UUID UNIQUE DEFAULT (uuid_generate_v4 ()),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company_id INT,
        position TEXT,
        social_links JSON,
        birthday DATE,
        last_contact TIMESTAMP,
        notes TEXT,
        preferred_contact_method TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_id INT
    );

ALTER TABLE clients ADD FOREIGN KEY (company_id) REFERENCES companies (id);

ALTER TABLE clients ADD FOREIGN KEY (owner_id) REFERENCES users (id);

CREATE TABLE
    IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        pid UUID UNIQUE DEFAULT (uuid_generate_v4 ()),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        company_id INT,
        position TEXT,
        social_links JSON,
        birthday DATE,
        last_contact TIMESTAMP,
        first_contact TIMESTAMP,
        follow_up TIMESTAMP,
        source TEXT,
        notes TEXT,
        lead_status TEXT,
        preferred_contact_method TEXT,
        lead_score INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner_id INT
    );

ALTER TABLE leads ADD FOREIGN KEY (company_id) REFERENCES companies (id);

ALTER TABLE leads ADD FOREIGN KEY (owner_id) REFERENCES users (id);