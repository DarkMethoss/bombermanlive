import Bomb from "./bomb.js"
import GameMap from "./map.js"

export default class Game {
    constructor(room) {
        this.room = room
        this.players = this.room.players
        this.initialBoard = null
        this.bricks = []
        this.powerUps = []
        this.bombs = []
        this.flames = []
        this.map = new GameMap(this, 15)
        this.initPlayerPositions()
    }
    // 14 x 10
    initPlayerPositions() {
        const size = this.map.size
        const startPositions = [{ x: 1, y: 1 }, { x: size - 2, y: size - 2 }, { x: 1, y: size - 2 }, { x: size - 2, y: 1 }]
        const colors = ["red", "green", "blue", "yellow"];
        [...this.players.values()].forEach((player) => {
            const { x, y } = startPositions.shift()
            const color = colors.shift()
            player.x = x * 50 + 5
            player.y = y * 50 + 5
            player.color = color
            player.game = this
        })
    }

    update(playerId, data) {
        const { deltaTime, playerMovements, placedBomb } = data

        if (!playerMovements) return
        let player = this.room.players.get(playerId)

        // todo: update player position
        if (playerMovements) player.update(deltaTime, playerMovements)

        // todo: update game bombs
        if (placedBomb) this.bombs.append(new Bomb(this, playerId, player.x, player.y))

        // todo: update game map
    }

    get gameMap() {
        return this.initialBoard
    }

    get gameData() {
        return {
            players: [...this.players.values()].map(player => player.playerData),
            bricks: this.bricks,
            powerUps: this.powerUps,
            bombs: this.bombs
        }
    }

}