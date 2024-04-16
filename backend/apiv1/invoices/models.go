package invoices

type CreateInvoiceRequest struct {
	ClientID    string `json:"clientId" binding:"required"`
	DueDate     string `json:"dueDate" binding:"required"`
	DateOfIssue string `json:"dateOfIssue"`
	Amount      int    `json:"amount" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type UpdateInvoiceRequest struct {
	ID          string `json:"id" binding:"required"`
	ClientID    string `json:"clientId" binding:"required"`
	DueDate     string `json:"dueDate" binding:"required"`
	DateOfIssue string `json:"dateOfIssue" binding:"required"`
	Amount      int    `json:"amount" binding:"required"`
	Description string `json:"description" binding:"required"`
	IsPaid      *bool  `json:"isPaid" binding:"required"`
}
