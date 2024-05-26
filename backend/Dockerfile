# Firstly build the app then copy the build and run the app
FROM golang:1.22 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main .

FROM debian:stable-slim

COPY --from=builder /app/main /app/main
# Get the port from the environment variable
ARG PORT
ENV PORT=$PORT
ARG POSTGRESQL_URL 
ENV POSTGRESQL_URL=$POSTGRESQL_URL

EXPOSE $PORT

CMD ["/app/main"]