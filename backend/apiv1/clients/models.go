package clients

type Client struct {
	ID             string `json:"id" binding:"required"`
	Name           string `json:"name" binding:"required"`
	Email          string `json:"email" binding:"required"`
	Phone          string `json:"phone" binding:"required"`
	Address        string `json:"address" binding:"required"`
	TotalPurchases int    `json:"total_purchases" binding:"required"`
	IsBusiness     bool   `json:"is_business" binding:"required"`
}

type ClientsCreate struct {
	Name           string `json:"name" binding:"required"`
	Email          string `json:"email" binding:"required"`
	Phone          string `json:"phone" binding:"required"`
	Address        string `json:"address" binding:"required"`
	TotalPurchases int    `json:"total_purchases" binding:"required"`
	IsBusiness     *bool  `json:"is_business" binding:"required"`
}
