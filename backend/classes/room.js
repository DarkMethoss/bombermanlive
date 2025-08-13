
export default class Room {
    constructor(id, server) {
        this.id = id
        this.gameServer = server
        this.players = new Map()
        // this.game = new Game(this)
    }

    getPlayers() {
        return `Players: ${[...this.players.keys()]}`
    }

    isEmpty() {
        return this.players.size < 4
    }

    isValidName(playerName) {
        let names = [...this.players.values()].map(player => player.userName)
        return !names.includes(playerName)
    }

    addPlayer(playerId, playerName, newPlayer) {
        this.players.set(playerId, newPlayer);
        newPlayer.userName = playerName
        newPlayer.roomId = this.id
        this.brodcast("waitingLobby")
    }

    removePlayer(playerId) {
        this.players.delete(playerId)
        this.brodcast("waitingLobby")
    }

    brodcast(type) {
        let message = { type };
        switch (type) {
            case "waitingLobby":
                let onlinePlayers = [...this.players.values()].map(player=>player.userName)
                message.data = { players: onlinePlayers, seconds:20}
                break;

            default:
                break;
        }

        [...this.players.values()].forEach(player => {
            player.ws.send(JSON.stringify(message))
        })
    }

}