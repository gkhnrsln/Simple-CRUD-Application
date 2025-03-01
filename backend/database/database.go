package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	cfg := mysql.Config{
		User:                 os.Getenv("DBUSER"),
		Passwd:               os.Getenv("DBPASS"),
		Net:                  "tcp",
		Addr:                 os.Getenv("DBHOST") + ":3306",
		DBName:               os.Getenv("DBNAME"),
		AllowNativePasswords: true,
	}
	var err error

	for range 5 {
		DB, err = sql.Open("mysql", cfg.FormatDSN())
		if err != nil {
			log.Fatal(err)
		}

		if err := DB.Ping(); err != nil {
			fmt.Println(err)
		}
		time.Sleep(5 * time.Second)
	}

	fmt.Println("Connected!")
}
