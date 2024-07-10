import {SocialLinks} from './SocialLink';

export interface ClientCreate {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_id: number;
    position: string;
    social_links: SocialLinks;
    birth_date?: string; // Optional property
    last_contact?: string; // Optional property
    notes?: string; // Optional property
    preferred_contact_method?: string; // Optional property
}

export interface Client {
    pid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_id: number;
    position: string;
    social_links: string; // Assuming this is a base64 encoded JSON string
    birthday: string | null; // Optional property, can be null
    last_contact: string | null; // Optional property, can be null
    notes?: string; // Optional property
    preferred_contact_method?: string; // Optional property
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}
