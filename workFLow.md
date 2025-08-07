# BomberMan-Dom

## 🎯 Project Workflow

### 🚀 Before Game

#### 1. Name Entry

- Client: Show input for player name

#### 2. Lobby Waiting Room

- Server adds player to a room (or creates one)
- If room has 2+ players:
  - Start 20s countdown
- If players leave and only 1 remains:
  - Cancel countdown

#### 3. Pre-Game Countdown (10s)

- Starts when:
  - 20s ends, or
  - Room has 4 players

#### 4. Start Game

- Server initializes:
  - Map
  - Players with positions

---

### 🎮 During Game (Per Room)

- Players send input via `playerAction`
  - e.g., move, place bomb
- Server processes input and updates state
- Server runs a game loop (e.g. 60 ticks/sec):
  - Move players
  - Detonate bombs
  - Handle collisions
  - Apply power-ups
- Server emits `gameStateUpdate` to all clients

---

### 🏁 End Game

- When only 1 player remains:
  - Server emits `gameOver` with winner ID
  - Clients show Win/Lose screen
  - Optionally emit `returnToLobby` for rematch

---

## 🧱 Core Classes

### 🔌 Server

- Sets up socket server
- Manages rooms and connections
- Forwards inputs to the correct `GameRoom`

### 🏠 GameRoom

- Holds 2–4 players
- Controls phase: `WAITING`, `PRE_GAME`, `IN_GAME`, `GAME_OVER`
- Manages one `Game` instance

### 🎮 Game

- Contains all in-game logic and entities
- Has game loop: tick-based update system

### 🧑 Player

- Position, health, bomb count, speed, flame
- Belongs to a GameRoom
- Can send input to server

### 💥 Bomb

- Owner, placed time, blast radius
- Explodes after delay

### 🗺 Map

- Static layout of blocks and destructibles
- Methods: `placeBomb`, `isWalkable`, `spawnPowerUp`

### ⚡ PowerUps

- Type: Speed, Bomb+, Flame+, etc.
- Collected by players

### ⌨️ UserInputs (to think about ???)

- Handles input queuing
- Could be part of server `GameRoom` logic
- Translates `playerAction` events into game actions

## Websocket events:

### "uiControlEvents":

-       {
            "type": "enterName",
            "payload": {
                "state": "enterName"
            }
        }
-       {
            "type": "waitingLobby",
            "payload": {
                "state": "waitingLobby",
                "players": ["ayoub", "lucas"]
            }
        }
-       {
            "type": "lobbyCountdown",
            "payload": {
                "state": "lobbyCountdown",
                "remaining": 15,
                "players": ["ayoub", "lucas"]
            }
        }
-       {
            "type": "preGameCountdown",
            "payload": {
                "state": "preGameCountdown",
                "remaining": 8
            }
        }
-       {
            "type": "inGame",
            "payload": {
                "state": "inGame",
                "gameData": {
                    "map": [],
                    "players": [{},],
                    "blocks": [{x,y},]
                }
            }
        }
-       {
             "type": "gameOver",
             "payload": {
                 "resutl": "Win"
             }
         }

### "GamePlayEvents":
-        {
             "type": "playerInputEvents",
             "payload": {
                "action" : " "
             }
         }
-       {
            "type": "gameStateUpdate",
            "payload": {
                "players": [
                    { "id": "player1", "x": 100, "y": 50, "alive": true },
                    { "id": "player2", "x": 150, "y": 70, "alive": false }
                ],
                "bombs": [
                    { "id": "bomb1", "x": 120, "y": 60, "timeLeft": 3000 }
                ],
                "powerUps": [
                    { "type": "speed", "x": 200, "y": 150 }
                ],
                "timer": 7500
            }
        }
