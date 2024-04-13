CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS clients
(
    pk SERIAL PRIMARY KEY,
    id UUID UNIQUE DEFAULT (uuid_generate_v4()),
    name TEX, 
    email TEXT,
    phone TEXT,
    is_bussiness BOOLEAN,
    last_purchase TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices
(
    pk SERIAL PRIMARY KEY,
    id UUID UNIQUE DEFAULT (uuid_generate_v4()),
    client_id INT,
    total_amount INT,
    date_of_issue TIMESTAMP,
    due_date TIMESTAMP,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE invoices
ADD FOREIGN KEY (client_id) REFERENCES clients(pk);


