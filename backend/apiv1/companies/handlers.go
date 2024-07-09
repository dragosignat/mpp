package companies

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"openinvoice-api/internal/pgdb"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

func (s *Service) getCompanies(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	// Paginate
	pageStr := c.DefaultQuery("page", "1")
	pageSizeStr := c.DefaultQuery("pageSize", "10")

	page, err := strconv.ParseInt(pageStr, 10, 32)
	if err != nil || page < 1 {
		c.JSON(400, gin.H{"message": "Invalid page"})
		return
	}

	pageSize, err := strconv.ParseInt(pageSizeStr, 10, 32)
	if err != nil || pageSize < 1 || pageSize > 100 {
		c.JSON(400, gin.H{"message": "Invalid pageSize"})
		return
	}

	offset := (page - 1) * pageSize

	companies, err := s.queries.GetCompanies(c, pgdb.GetCompaniesParams{
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
		Offset:  int32(offset),
		Limit:   int32(pageSize),
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching companies"})
		log.Println(err)
		return
	}

	if companies == nil {
		c.JSON(404, gin.H{"message": "No companies found"})
		return
	}

	c.JSON(200, companies)

}

func (s *Service) getCompany(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	companyId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(companyId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	company, err := s.queries.GetCompanyByID(c, pgdb.GetCompanyByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(404, gin.H{"message": "Company not found"})
		return
	}

	c.JSON(200, company)
}

func (s *Service) deleteCompany(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	companyId := c.Param("id")

	var uuid pgtype.UUID
	err := uuid.Scan(companyId)

	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid UUID"})
		return
	}

	_, err = s.queries.GetCompanyByID(c, pgdb.GetCompanyByIDParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(404, gin.H{"message": "Company not found"})
		return
	}

	err = s.queries.DeleteCompany(c, pgdb.DeleteCompanyParams{
		Pid:     uuid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error deleting company"})
		log.Println(err)
		return
	}

	c.JSON(200, gin.H{"message": "Company deleted"})
}

func (s *Service) searchCompanies(c *gin.Context) {

	userID := c.MustGet("userID").(int32)

	search := c.Query("search")

	companies, err := s.queries.SearchCompanies(c, pgdb.SearchCompaniesParams{
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
		Name:    search,
		Limit:   10,
	})

	if err != nil {
		c.JSON(500, gin.H{"message": "Error fetching companies"})
		log.Println(err)
		return
	}

	if companies == nil {
		c.JSON(404, gin.H{"message": "No companies found"})
		return
	}

	c.JSON(200, companies)

}

func (s *Service) createCompany(c *gin.Context) {
	userID := c.MustGet("userID").(int32)

	var company CompanyCreate
	if err := c.ShouldBindJSON(&company); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	addressBytes, err := json.Marshal(company.Address)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating company", "error": err.Error()})
		log.Println("Error creating company:", err)
		return
	}

	companySQL := pgdb.CreateCompanyParams{
		Name:          company.Name,
		Industry:      pgtype.Text{String: company.Industry, Valid: true},
		Website:       pgtype.Text{String: company.Website, Valid: true},
		OwnerID:       pgtype.Int4{Int32: userID, Valid: true},
		Email:         pgtype.Text{String: company.Email, Valid: true},
		Phone:         pgtype.Text{String: company.Phone, Valid: true},
		ContactPerson: pgtype.Text{String: company.ContactPerson, Valid: true},
		Size:          pgtype.Text{String: company.Size, Valid: true},
		Address:       addressBytes,
	}

	// Create the company
	createdCompany, err := s.queries.CreateCompany(c, companySQL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating company", "error": err.Error()})
		log.Println("Error creating company:", err)
		return
	}

	c.JSON(http.StatusCreated, createdCompany)
}

func (s *Service) updateCompany(c *gin.Context) {
	userID := c.MustGet("userID").(int32)
	companyPID := c.Param("id")

	var updateCompany CompanyCreate
	if err := c.ShouldBindJSON(&updateCompany); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input data", "error": err.Error()})
		return
	}

	// Parse the company PID
	var pid pgtype.UUID
	err := pid.Scan(companyPID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid company ID"})
		return
	}

	address, err := json.Marshal(updateCompany.Address)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error updating company", "error": err.Error()})
		log.Println("Error updating company:", err)
		return
	}

	updateParams := pgdb.UpdateCompanyParams{
		Pid:           pid,
		Name:          updateCompany.Name,
		Industry:      pgtype.Text{String: updateCompany.Industry, Valid: true},
		Website:       pgtype.Text{String: updateCompany.Website, Valid: true},
		OwnerID:       pgtype.Int4{Int32: userID, Valid: true},
		Email:         pgtype.Text{String: updateCompany.Email, Valid: true},
		Phone:         pgtype.Text{String: updateCompany.Phone, Valid: true},
		ContactPerson: pgtype.Text{String: updateCompany.ContactPerson, Valid: true},
		Size:          pgtype.Text{String: updateCompany.Size, Valid: true},
		Address:       address,
	}

	// Update the company
	err = s.queries.UpdateCompany(c, updateParams)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "Company not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error updating company", "error": err.Error()})
			log.Println("Error updating company:", err)
		}
		return
	}

	// Fetch the updated company to return in the response
	updatedCompany, err := s.queries.GetCompanyByID(c, pgdb.GetCompanyByIDParams{
		Pid:     pid,
		OwnerID: pgtype.Int4{Int32: userID, Valid: true},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error fetching updated company", "error": err.Error()})
		log.Println("Error fetching updated company:", err)
		return
	}

	c.JSON(http.StatusOK, updatedCompany)
}
