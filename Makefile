.PHONY: run-all

run-all:
	cd server && npm install && npm start & 
	cd client && python3 -m http.server