CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TABLE
IF NOT EXISTS clients
(
    id UUID UNIQUE PRIMARY KEY DEFAULT
(uuid_generate_v4
()),
    name TEXT UNIQUE NOT NULL, 
    email TEXT,
    phone TEXT,
    address TEXT,
    total_purchases INT,
    is_bussiness BOOLEAN,
    last_purchase TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE
IF NOT EXISTS invoices
(
    id UUID UNIQUE PRIMARY KEY DEFAULT
(uuid_generate_v4
()),
    client_id UUID,
    amount INT,
    date_of_issue TIMESTAMP,
    due_date TIMESTAMP,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE invoices
ADD FOREIGN KEY (client_id) REFERENCES clients(id);


