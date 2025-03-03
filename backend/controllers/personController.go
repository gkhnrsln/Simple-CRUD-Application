package controllers

import (
	"encoding/json"
	"fmt"
	"gkhnrsln/web-service-gin/model"
	"io"
	"net/http"
	"os"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var dataUrl = "assets/persons.json"
var persons []model.Person
var mu sync.Mutex

func init() {
	file, err := os.Open(dataUrl)
	if err != nil {
		fmt.Println("Error opening persons.json:", err)
		return
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("Error reading persons.json:", err)
		return
	}

	err = json.Unmarshal(byteValue, &persons)
	if err != nil {
		fmt.Println("Error unmarshalling persons.json:", err)
	}
}

func GetPersons(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, persons)
}

func GetPersonByID(c *gin.Context) {
	id := c.Param("id")

	for _, person := range persons {
		if person.ID == id {
			c.IndentedJSON(http.StatusOK, person)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
}

func PostPerson(c *gin.Context) {
	var newPerson model.Person

	if err := c.BindJSON(&newPerson); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newPerson.ID = uuid.NewString()

	mu.Lock()
	persons = append(persons, newPerson)
	mu.Unlock()

	c.IndentedJSON(http.StatusCreated, newPerson)
}

func DeletePerson(c *gin.Context) {
	id := c.Param("id")

	for i, person := range persons {
		if person.ID == id {
			persons = append(persons[:i], persons[i+1:]...)
			c.IndentedJSON(http.StatusOK, gin.H{"message": "person deleted"})
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
}

func UpdatePerson(c *gin.Context) {
	id := c.Param("id")

	var updatedPerson model.Person
	if err := c.BindJSON(&updatedPerson); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid JSON"})
		return
	}

	for i, person := range persons {
		if person.ID == id {
			persons[i] = updatedPerson
			c.IndentedJSON(http.StatusOK, updatedPerson)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
}
