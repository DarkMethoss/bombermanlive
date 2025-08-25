import Game from "./game.js"


export default class Room {
    constructor(id, server) {
        this.id = id
        this.gameServer = server
        this.players = new Map()
        this.waitingCounter = 50
        this.gameStartCounter = 1
        this.isClosed = false
        this.countDownInterval = null
        this.game = null
    }

    isEmpty() {
        return this.players.size < 4
    }

    isValidName(playerName) {
        let names = [...this.players.values()].map(player => player.userName)
        return !names.includes(playerName)
    }

    addPlayer(playerId, playerName, newPlayer) {
        this.players.set(playerId, newPlayer)
        newPlayer.userName = playerName
        newPlayer.roomId = this.id
        let pCnt = this.players.size
        if (pCnt === 4) {
            this.startGameStartCountDown()
            return
        }
        this.brodcast("waitingLobby")
        if (pCnt >= 2) {
            this.startWaitingCountdown()
        }
    }

    removePlayer(playerId) {
        this.players.delete(playerId);
        let pCnt = this.players.size

        // determine if there is a last standing player
        if (this.isClosed && this.game) {
            if (pCnt === 1) {
                const lastPlayer = this.players.values().next().value;
                lastPlayer.isWon()
            }
            return
        }

        if (pCnt == 1) {
            this.isClosed = false
            this.waitingCounter = 50
            this.stopWaitingCountdown()
        }
        this.brodcast("waitingLobby")
    }

    startWaitingCountdown() {
        if (this.countDownInterval) {
            clearInterval(this.countDownInterval)
        }
        this.countDownInterval = setInterval(() => {
            if (this.waitingCounter > 0) {
                this.waitingCounter--
                this.brodcast("waitingLobby")
            } else {
                this.gameStartCounter = 1
                this.startGameStartCountDown()
            }
        }, 1000);
    }

    stopWaitingCountdown() {
        this.waitingCounter = 50
        if (this.countDownInterval) {
            clearInterval(this.countDownInterval)
            this.countDownInterval = null
        }
    }

    startGameStartCountDown() {
        this.isClosed = true
        if (this.countDownInterval) {
            clearInterval(this.countDownInterval)
        }
        this.brodcast("waitingLobby", { state: "gameStartCountDown" })
        this.countDownInterval = setInterval(() => {
            if (this.gameStartCounter > 0) {
                this.gameStartCounter--
                this.brodcast("waitingLobby", { state: "gameStartCountDown" })
            } else {
                this.startGame()
            }
        }, 1000)
    }

    startGame() {
        clearInterval(this.countDownInterval)
        this.game = new Game(this)
        // this.game.
        this.brodcast("startGame")
    }

    brodcast(type, options) {
        let message = { type };
        switch (type) {
            case "waitingLobby":
                let players = [...this.players.values()].map(player => player.userName)
                let state = options?.state || "waitingCountDown"
                let seconds = state === "waitingCountDown" ? this.waitingCounter : this.gameStartCounter
                message.data = { players, seconds, state }
                break;
            case "startGame":
                message.data = {
                    map : this.game.gameMap,
                    ...this.game.gameData
                }
                break;
            case "gameUpdates":
                message.data = this.game.gameData
                break;
            case "chat":
                message.data = options
                console.log(message)
            default:
                break;
        }


        [...this.players.values()].forEach(player => {
            player.ws.send(JSON.stringify(message))
        })
    }
}