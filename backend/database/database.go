package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	fmt.Println("Connect to DB...")
	cfg := mysql.Config{
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  "tcp",
		Addr:                 os.Getenv("DBHOST") + ":3306",
		DBName:               os.Getenv("DBNAME"),
		AllowNativePasswords: true,
	}
	var err error

	DB, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal("Error initializing database:", err)
	}

	if err := DB.Ping(); err != nil {
		fmt.Println(err)
	}

	fmt.Println("Connected!")
}
