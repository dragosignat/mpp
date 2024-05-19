package invoices

type CreateInvoiceRequest struct {
	ClientID    string `json:"client_id" binding:"required"`
	DueDate     string `json:"due_date" binding:"required"`
	DateOfIssue string `json:"date_of_issue"`
	Amount      int    `json:"amount" binding:"required"`
	Description string `json:"description"`
}

type UpdateInvoiceRequest struct {
	ID          string `json:"id" binding:"required"`
	ClientID    string `json:"client_id" binding:"required"`
	DueDate     string `json:"due_date" binding:"required"`
	DateOfIssue string `json:"date_of_issue" binding:"required"`
	Amount      int    `json:"amount" binding:"required"`
	Description string `json:"description"`
	IsPaid      *bool  `json:"is_paid" binding:"required"`
}
