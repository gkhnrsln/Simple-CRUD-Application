package main

import (
	"time"
	"web-service-gin/controllers"
	"web-service-gin/database"
	"web-service-gin/handlers"
	"web-service-gin/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.POST("/login", handlers.LoginHandler)

	router.GET("/persons", controllers.GetPersons)
	router.GET("/persons/:id", controllers.GetPersonByID)

	router.PUT("/persons/:id", middleware.JWTMiddleware(), controllers.UpdatePerson)
	router.POST("/persons", middleware.JWTMiddleware(), controllers.PostPerson)
	router.DELETE("/persons/:id", middleware.JWTMiddleware(), controllers.DeletePerson)

	router.Run()
}
