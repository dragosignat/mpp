package kanban

type TaskCreate struct {
	// ID         int32  `json:"id" binding:"required"`
	Title      string `json:"title" binding:"required"`
	ColumnType string `json:"column_type" binding:"required"`
}
