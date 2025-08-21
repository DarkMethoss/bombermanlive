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
        this.map = new GameMap(this, { cols: 15, rows: 15 })
        this.initPlayerPositions()
    }
    // 14 x 10
    initPlayerPositions() {
        const cols = this.map.cols
        const rows = this.map.rows
        const startPositions = [{ x: 1, y: 1 }, { x: cols - 2, y: rows - 2 }, { x: 1, y: rows - 2 }, { x: cols - 2, y: 1 }]
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
        const { deltaTime, playerMovements, bombs } = data
        if (!playerMovements) return
        let player = this.room.players.get(playerId)

        // todo: update player position
        if (playerMovements) player.update(deltaTime, playerMovements)

        // todo: update game bombs
        if (bombs) this.bombs.append(new Bomb(this, playerId, player.x, player.y))

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