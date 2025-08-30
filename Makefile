.PHONY: run-backend run-frontend run-all

run-backend:
	cd server && npm start

run-frontend:
	cd client && npm start

run-all:
	cd server && npm i && npm start \
	cd client && python3 -m http.server \