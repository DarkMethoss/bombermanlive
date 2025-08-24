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
        this.powerUpsHardCoded = new Map()
        let firstBrick = Array.from(this.bricks)[0]
        this.powerUpsHardCoded.set(firstBrick[0], new powerUp(this, 'speed', this.map.getCell(firstBrick[1].x, firstBrick[1].y), firstBrick[0]))
        this.initPlayerPositions()
    }

    get gameMap() {
        return this.initialBoard
    }

    get gameData() {
        let flames = [...this.flames.values()].map(flames => flames[0].position)
        if (flames.length > 0) console.log(flames)
        return {
            players: [...this.players.values()].map(player => player.playerData),
            bricks: [...this.bricks.values()],
            powerUps: this.powerUps,
            bombs: [...this.bombs.values()].map(bomb => bomb.position),
            flames: [...this.flames.values()].map(flames => flames[0].position)
        }
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





    update(playerId, data) {
        const { deltaTime, playerMovements, placedBomb } = data
        let player = this.room.players.get(playerId)
        if (playerMovements) player.update(deltaTime, playerMovements)
        if (placedBomb) {
            // console.log("bomb placed", placedBomb)
            this.handlePlacedBomb(player)
        }
        // todo: update game map
      

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