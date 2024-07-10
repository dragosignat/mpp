import {SocialLinks, decodeBase64SocialLinks} from './SocialLink';

export interface Lead {
    pid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_id: number;
    position: string;
    social_links: string; // Assuming this is a base64 encoded JSON string
    birthday: string | null; // Assuming null if not provided
    last_contact: string | null; // Assuming null if not provided
    first_contact: string | null; // Assuming null if not provided
    follow_up: string | null; // Assuming null if not provided
    source: string;
    notes: string;
    lead_status: string;
    preferred_contact_method: string;
    lead_score: number;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

export interface LeadCreate {
    first_name: string;
    last_name: string;
    email: string;
    source: string;
    phone?: string;
    company_id?: number;
    position?: string;
    notes?: string;
    preferred_contact_method?: string;
    social_links: SocialLinks;
    birthday?: string;
}
