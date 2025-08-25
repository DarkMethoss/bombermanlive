import Bomb from "./bomb.js"
import GameMap from "./map.js"
import { powerUp } from "./powerup.js"

export default class Game {
    constructor(room) {
        this.room = room
        this.players = this.room.players
        this.initialBoard = null
        this.powerUps = new Map()
        this.bricks = new Map()
        this.bombs = new Map()
        this.flames = new Map()
        this.map = new GameMap(this, 15)
        this.affectedBricks = []
        this.initPlayerPositions()
    }

    get gameMap() {
        return this.initialBoard
    }

    get gameData() {
        // filter those who have the 0 and then replace them with 5



        return {
            players: [...this.players.values()].map(player => player.playerData),
            bricks: [...this.bricks.values()],
            powerUps: this.PowerUpsTosend(),
            bombs: [...this.bombs.values()].map(bomb => bomb.position),
            flames: [...this.flames.values()].map(flames => flames[0].position)
        }
    }


    PowerUpsTosend() {
        let powerUpsTosend = []

        for (let value of [...this.affectedBricks.values()]) {
            let { col, row } = value
            if (this.map.HoldsPowerUp(col, row)) {
                powerUpsTosend.push(this.powerUps.get(`${col}-${row}`))
            }
        }

        return powerUpsTosend

    }



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




    // here goes the update of each player bu7duuu
    update(playerId, data) {
        const { deltaTime, playerMovements, placedBomb } = data
        let player = this.room.players.get(playerId)
        if (playerMovements) player.update(deltaTime, playerMovements)
        if (placedBomb) {
            this.handlePlacedBomb(player)
        }

    }

    handlePlacedBomb(player) {
        let x = player.x + player.width / 2
        let y = player.y + player.height / 2
        let { col, row } = this.map.getCell(x, y)
        let cellValue = this.map.getCellValue(col, row)
        let canPlaceBomb = player.bombsPlaced < player.bomb && cellValue != 3
        if (canPlaceBomb) {
            this.bombs.set(`${col}-${row}`, new Bomb(this, player, col, row, this.map))
            player.bombsPlaced++
        }
    }
}