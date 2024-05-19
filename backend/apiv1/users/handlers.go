package users

import (
	"log"
	"openinvoice-api/internal/middleware"
	"openinvoice-api/internal/pgdb"
	"openinvoice-api/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (s *Service) register(c *gin.Context) {

	var user CreateUser
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	// Check if the user already exists
	_, err := s.queries.GetUserByEmail(c, user.Email)
	if err == nil {
		c.JSON(400, gin.H{"message": "User already exists"})
		return
	}

	_, err = s.queries.GetUserByUsername(c, user.Username)
	if err == nil {
		c.JSON(400, gin.H{"message": "User already exists"})
		return
	}

	if !utils.ValidateEmail(user.Email) {
		c.JSON(400, gin.H{"message": "Invalid email"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating user"})
		log.Println(err)
		return
	}

	// Create the user
	_, err = s.queries.CreateUser(c, pgdb.CreateUserParams{
		Username: user.Username,
		Email:    user.Email,
		Password: string(hashedPassword),
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error creating user"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"message": "User created"})
}

func (s *Service) login(c *gin.Context) {

	var user LoginUser
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	// Get the user by email
	u, err := s.queries.GetUserByEmail(c, user.Email)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid email or password"})
		return
	}

	// Compare the passwords
	err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(user.Password))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid email or password"})
		return
	}

	// Generate the token
	token, err := middleware.GenerateToken(uint(u.ID))
	if err != nil {
		c.JSON(500, gin.H{"message": "Error generating token"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"token": token})

}

func (s *Service) me(c *gin.Context) {

	userID := c.MustGet("userID").(uint)

	u, err := s.queries.GetUserByID(c, int32(userID))
	if err != nil {
		c.JSON(500, gin.H{"message": "Error getting user"})
		log.Println(err)
		return
	}

	c.JSON(200, u)

}
