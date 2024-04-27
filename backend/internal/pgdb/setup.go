package pgdb

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pkg/errors"
)

const (
	PGConnectionStringEnvName = "POSTGRESQL_URL"
)

func getConnectionString() (string, error) {
	conStr := os.Getenv(PGConnectionStringEnvName)
	if conStr == "" {
		return "", errors.New("POSTGRESQL_URL environment variable not set")
	}
	return conStr, nil
}

func Connect() (*pgxpool.Pool, error) {
	connectionString, err := getConnectionString()

	if err != nil {
		log.Fatalf("Error getting connection string: %v", err)
	}

	dbPool, err := pgxpool.New(context.Background(), connectionString)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	return dbPool, nil
}

func Close(dbPool *pgxpool.Pool) {
	dbPool.Close()
}
