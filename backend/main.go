package main

import (
	"gkhnrsln/web-service-gin/controllers"
	"gkhnrsln/web-service-gin/database"
	"gkhnrsln/web-service-gin/handlers"
	"gkhnrsln/web-service-gin/middleware"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()
	if database.DB == nil {
		log.Fatal("Database connection is nil")
	}

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

	protected := router.Group("/admin")
	protected.Use(middleware.JWTMiddleware())
	{
		protected.POST("/persons", controllers.PostPerson)
		protected.PUT("/persons/:id", controllers.UpdatePerson)
		protected.DELETE("/persons/:id", controllers.DeletePerson)
	}

	router.Run()
}
