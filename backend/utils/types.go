package utils

type Address struct {
	Street  string `json:"street"`
	City    string `json:"city"`
	State   string `json:"state"`
	Country string `json:"country"`
}

type SocialLinks struct {
	Facebook  string `json:"facebook"`
	Twitter   string `json:"twitter"`
	LinkedIn  string `json:"linkedin"`
	Instagram string `json:"instagram"`
}
