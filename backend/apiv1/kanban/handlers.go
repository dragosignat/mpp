package kanban

import (
	"log"
	"strconv"

	"openinvoice-api/internal/pgdb"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getBoard(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	board, err := s.queries.GetBoard(c, pgtype.Int4{
		Int32: userID,
		Valid: true,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching board"})
		log.Println(err)
		return
	}

	if board == nil {
		c.JSON(404, gin.H{"message": "No board found"})
		return
	}

	c.JSON(200, board)
}

func (s *Service) postTask(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	var task TaskCreate
	err := c.BindJSON(&task)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid task"})
		return
	}

	_, err = s.queries.CreateTask(c, pgdb.CreateTaskParams{
		OwnerID:    pgtype.Int4{Int32: userID, Valid: true},
		Title:      task.Title,
		ColumnType: task.ColumnType,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating task"})
		log.Println(err)
		return
	}

	c.JSON(201, gin.H{"message": "Task created"})
}

func (s *Service) updateTask(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	taskID := c.Param("id")

	if taskID == "" {
		c.JSON(400, gin.H{"message": "Invalid task ID"})
		return
	}

	taskIDInt, err := strconv.Atoi(taskID)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid task ID"})
		return
	}

	var task TaskCreate
	err = c.BindJSON(&task)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid task"})
		return
	}

	err = s.queries.UpdateTask(c, pgdb.UpdateTaskParams{
		ID:         int32(taskIDInt),
		OwnerID:    pgtype.Int4{Int32: userID, Valid: true},
		Title:      task.Title,
		ColumnType: task.ColumnType,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error updating task"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"message": "Task updated"})
}

func (s *Service) deleteTask(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	taskID := c.Param("id")

	if taskID == "" {
		c.JSON(400, gin.H{"message": "Invalid task ID"})
		return
	}

	taskIDInt, err := strconv.Atoi(taskID)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid task ID"})
		return
	}

	err = s.queries.DeleteTask(c, pgdb.DeleteTaskParams{
		ID:      int32(taskIDInt),
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error deleting task"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"message": "Task deleted"})
}
