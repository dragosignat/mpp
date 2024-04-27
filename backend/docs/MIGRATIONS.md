## Migrations & SQL Code Generation

### Prerequisite

In order to be able to run the migrations (and later generate code based on the SQL queries), you'll need
two tools: [`sqlc`](https://github.com/sqlc-dev/sqlc) and [`go-migrate`](https://github.com/golang-migrate/migrate).\
sqlc is a tool that generates Go code from your SQL queries, and go-migrate is a tool that helps you manage your migrations.

Make sure to install both tools before proceeding, also export the sql connections string as an environment variable (be sure to replace the connection string with your own):

```bash
POSTGRESQL_URL='postgresql://postgres:mysecretpassword@localhost:5432/openinvoice_dev?sslmode=disable'
```

### Create a migration

Install the go-migrate tool:

```bash
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
```

To create a new migration, run the following command:

```bash
migrate create -ext sql -dir migrations -seq {migration_name}
```

This will create a new migration file in the `migrations` directory.\
The file will contain two sections: `up` and `down`.\
The `up` section contains the SQL queries that will be executed when you run the migration, and the `down` section contains the SQL queries that will be executed when you rollback the migration.

### Run the migrations

To run the migrations, you can use the following command:

```bash
migrate -path migrations -database ${POSTGRESQL_URL} up
```

This will run all the migrations that haven't been run yet.\
If you want to rollback a migration, you can use the following command:

```bash
migrate -path migrations -database ${POSTGRESQL_URL} down
```

## Code generation based on schema

```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```

The sqlc.yaml file contains all the configuration for generating GO code.

```bash
sqlc generate
```
