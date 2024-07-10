import {Address} from './Address';

export interface Company {
    id: number;
    name: string;
    industry: string;
    size: string;
    website: string;
    contact_person: string;
    email: string;
    phone: string;
    address: string; // Assuming this is a base64 encoded JSON string
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

export interface CompanyCreate {
    name: string;
    industry: string;
    size: string;
    website: string;
    contact_person: string;
    email: string;
    phone: string;
    address: Address;
}
