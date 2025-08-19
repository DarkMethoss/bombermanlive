.PHONY: run-backend run-frontend run-all

run-backend:
	cd server && npm start

run-frontend:
	cd client && npm start

run-all:
	npx concurrently --names "BACKEND,FRONTEND" -c "bgBlue.bold,bgGreen.bold" \
		"cd server && npm i && npm start" \
		"cd client && npm i && npm start" \