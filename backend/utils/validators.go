package utils

import (
	"regexp"
)

func ValidateEmail(email string) bool {

	// Regular expression for email validation
	regex := `^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`

	// Compile the regex
	re := regexp.MustCompile(regex)

	// Return if the email is valid
	return re.MatchString(email)
}
