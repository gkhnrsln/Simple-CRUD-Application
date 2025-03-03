package model

type Person struct {
	ID         string `json:"id"`
	Firstname  string `json:"firstName" binding:"required"`
	Lastname   string `json:"lastName" binding:"required"`
	Birthday   string `json:"birthday" binding:"required"`
	Mail       string `json:"mail"`
	Phone      string `json:"phone"`
	Profession string `json:"profession"`
}
