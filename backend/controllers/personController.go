package controllers

import (
	"encoding/json"
	"fmt"
	"gkhnrsln/web-service-gin/model"
	"io"
	"net/http"
	"os"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
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
	idInt, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid ID"})
		return
	}

	for _, p := range persons {
		if p.ID == idInt {
			c.IndentedJSON(http.StatusOK, p)
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

	mu.Lock()
	persons = append(persons, newPerson)
	mu.Unlock()

	c.IndentedJSON(http.StatusCreated, newPerson)
}

func DeletePerson(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid ID"})
		return
	}

	for i, p := range persons {
		if p.ID == idInt {
			persons = append(persons[:i], persons[i+1:]...)
			c.IndentedJSON(http.StatusOK, gin.H{"message": "person deleted"})
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
}

func UpdatePerson(c *gin.Context) {
	id := c.Param("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid ID"})
		return
	}

	var updatedPerson model.Person
	if err := c.BindJSON(&updatedPerson); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "invalid JSON"})
		return
	}

	for i, p := range persons {
		if p.ID == idInt {
			persons[i] = updatedPerson
			c.IndentedJSON(http.StatusOK, updatedPerson)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "person not found"})
}
