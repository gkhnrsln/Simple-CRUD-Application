FROM golang:1.26 AS builder
WORKDIR /go/src/app
COPY go.* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o app .

FROM alpine:3.23.4
COPY --from=builder /go/src/app .
EXPOSE 8080
CMD ["./app"]