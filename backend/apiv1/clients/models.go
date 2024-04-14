package clients

type Client struct {
	ID             string `json:"clientId" binding:"required"`
	Name           string `json:"clientName" binding:"required"`
	Email          string `json:"clientEmail" binding:"required"`
	Phone          string `json:"clientPhone" binding:"required"`
	Address        string `json:"clientAddress" binding:"required"`
	TotalPurchases int    `json:"clientTotalPurchases" binding:"required"`
	IsBusiness     bool   `json:"clientIsBusiness" binding:"required"`
}

type ClientsCreate struct {
	Name           string `json:"clientName" binding:"required"`
	Email          string `json:"clientEmail" binding:"required"`
	Phone          string `json:"clientPhone" binding:"required"`
	Address        string `json:"clientAddress" binding:"required"`
	TotalPurchases int    `json:"clientTotalPurchases" binding:"required"`
	IsBusiness     *bool  `json:"clientIsBusiness" binding:"required"`
}
