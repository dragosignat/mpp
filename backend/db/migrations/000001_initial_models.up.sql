CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

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
    is_business BOOLEAN,
    last_purchase TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT
);

ALTER TABLE invoices
ADD FOREIGN KEY (client_id) REFERENCES clients(id);

ALTER TABLE invoices
ADD FOREIGN KEY (owner_id) REFERENCES users(id);

ALTER TABLE clients
ADD FOREIGN KEY (owner_id) REFERENCES users(id);



