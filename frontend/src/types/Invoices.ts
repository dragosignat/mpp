export interface Invoice {
    id: string;
    client_id: string;
    amount: number;
    date_of_issue: string;
    due_date: string;
    description: string;
    is_paid: boolean;
    created_at: string;
    updated_at: string;
}

export interface InvoiceUpdate {
    id: string;
    client_id: string;
    amount: number;
    date_of_issue: string;
    due_date: string;
    description: string;
    is_paid: boolean;
}

export interface InvoiceCreate {
    client_id: string;
    amount: number;
    date_of_issue: string;
    due_date: string;
    description: string;
}
