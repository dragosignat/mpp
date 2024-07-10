export interface Campaign {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_processing: boolean;
    review_count: number;
}

export interface DetailedCampaign extends Campaign {
    positive: number;
    negative: number;
    neutral: number;
    overall_sentiment: string;
}

export interface SalesCampaign {
    id: number;
    name: string;
    type: string;
    script_id: number;
}

export interface SalesCampaignCreate {
    name: string;
    type: string;
    script_id: number;
    leads: number[];
}

export interface SalesScript {
    id: number;
    title: string;
    type: string;
    subject: string;
    body: string;
}

export interface SalesScriptCreate {
    title: string;
    type: string;
    subject: string;
    body: string;
}
