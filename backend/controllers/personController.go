package controllers

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"
	"web-service-gin/database"
	"web-service-gin/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetPersons(c *gin.Context) {
	var persons []model.Person
	rows, err := database.DB.Query("SELECT id, firstname, lastname, birthday, COALESCE(mail, ''), COALESCE(phone, ''), COALESCE(profession, '') FROM persons;")
	if err != nil {
		fmt.Println("Error querying persons from databse:", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving persons"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var p model.Person
		err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Birthday, &p.Mail, &p.Phone, &p.Profession)
		if err != nil {
			fmt.Println("Error scanning row:", err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Error processing data"})
			return
		}
		persons = append(persons, p)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Error iterating rows:", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Error reading data"})
		return
	}

	c.IndentedJSON(http.StatusOK, persons)
}

func GetPersonByID(c *gin.Context) {
	id := c.Param("id")
	var p model.Person

	err := database.DB.QueryRow("SELECT id, firstname, lastname, birthday, COALESCE(mail, ''), COALESCE(phone, ''), COALESCE(profession, '') FROM persons WHERE id = ?", id).Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Birthday, &p.Mail, &p.Phone, &p.Profession)
	if err != nil {
		if err == sql.ErrNoRows {
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
		} else {
			fmt.Println("Error querying person from database:", err)
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving person"})
		}
		return
	}

	c.IndentedJSON(http.StatusOK, p)
}

func PostPerson(c *gin.Context) {
	var newPerson model.Person

	if err := c.BindJSON(&newPerson); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newPerson.ID = uuid.NewString()

	parsedTime, err := time.Parse(time.RFC3339, newPerson.Birthday)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Use YYYY-MM-DD"})
		return
	}
	formattedDate := parsedTime.Format("2006-01-02")

	_, err = database.DB.Exec("INSERT INTO persons (id, firstname, lastname, birthday, mail, phone, profession) VALUES (?, ?, ?, ?, ?, ?, ?)",
		newPerson.ID,
		newPerson.Firstname,
		newPerson.Lastname,
		formattedDate,
		newPerson.Mail,
		newPerson.Phone,
		newPerson.Profession,
	)

	if err != nil {
		fmt.Println("Error inserting person into database:", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Could not insert person"})
		return
	}

	c.IndentedJSON(http.StatusCreated, newPerson)
}

func DeletePerson(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec("DELETE FROM persons WHERE id = ?", id)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "error deleting person"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"message": "person deleted"})
}

func UpdatePerson(c *gin.Context) {
	id := c.Param("id")

	var updatedPerson model.Person
	if err := c.BindJSON(&updatedPerson); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid JSON"})
		return
	}

	res, err := database.DB.Exec("UPDATE persons SET firstname = ?, lastname = ?, birthday = ?, mail = ?, phone = ?, profession = ? WHERE id = ?",
		updatedPerson.Firstname,
		updatedPerson.Lastname,
		updatedPerson.Birthday,
		updatedPerson.Mail,
		updatedPerson.Phone,
		updatedPerson.Profession,
		id,
	)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "error updating person"})
		return
	}

	rowsAffected, _ := res.RowsAffected()
	if rowsAffected == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, updatedPerson)
}
