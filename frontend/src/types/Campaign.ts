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
