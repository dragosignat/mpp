ALTER TABLE IF EXISTS invoices
ADD COLUMN is_paid BOOLEAN DEFAULT FALSE;