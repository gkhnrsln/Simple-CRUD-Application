package middleware

import (
	"gkhnrsln/web-service-gin/auth"
	"net/http"

	"github.com/gin-gonic/gin"
)

// JWTMiddleware überprüft den Authorization Header und validiert den Token
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		// Entferne "Bearer " vom Token
		tokenString = tokenString[7:]

		// Token validieren
		err := auth.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
