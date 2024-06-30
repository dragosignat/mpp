package campaigns

type DetailedCampaign struct {
	ID               int32  `json:"id" binding:"required"`
	Name             string `json:"name" binding:"required"`
	Description      string `json:"description" binding:"required"`
	CreatedAt        string `json:"created_at" binding:"required"`
	UpdatedAt        string `json:"updated_at" binding:"required"`
	ReviewCount      int64  `json:"review_count" binding:"required"`
	IsActive         bool   `json:"is_active" binding:"required"`
	IsProcessing     bool   `json:"is_processing" binding:"required"`
	Positive         int64  `json:"positive" binding:"required"`
	Negative         int64  `json:"negative" binding:"required"`
	Neutral          int64  `json:"neutral" binding:"required"`
	OverallSentiment string `json:"overall_sentiment" binding:"required"`
}

type CreateCampaignRequest struct {
	Name        string `form:"name" binding:"required"`
	Description string `form:"description" binding:"required"`
}

type Review struct {
	ReviewID   string
	ReviewText string
}
