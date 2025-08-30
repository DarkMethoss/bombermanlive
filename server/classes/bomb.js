import Flame from "./flame.js"

// note : handle the detonation timer
export default class Bomb {

    constructor(game, player, x, y, map) {
        this.game = game
        this.player = player
        this.playerId = this.player.id
        this.map = map
        this.x = x
        this.y = y
        this.detonationTimeOut = null
        this.isExploded = false
        this.flamesPosition = [{ x: this.x, y: this.y }]
        this.startDetonationCountDown()
    }

    get position() {
        const scale = this.game.map.width / this.game.map.size
        return {
            x: this.x * scale,
            y: this.y * scale
        }
    }

    startDetonationCountDown() {
        this.game.map.board[this.y][this.x] = 3
        this.detonationTimeOut = setTimeout(() => {
            this.game.bombs.delete(`${this.x}-${this.y}`)
            this.player.bombsPlaced--
            this.handleExplosion()
        }, 3000);
    }

    handleExplosion() {
        let flameRange = this.player.flame
        const directions = [
            { dx: -1, dy: 0 }, // left
            { dx: 1, dy: 0 },  // right
            { dx: 0, dy: -1 }, // up
            { dx: 0, dy: 1 }   // down
        ]

        directions.forEach(dir => {
            for (let i = 1; i <= flameRange; i++) {
                let x = this.x + dir.dx * i
                let y = this.y + dir.dy * i

                if (this.game.map.isFlameBlocked(x, y)) {
                    if (this.game.map.isBricks(x, y)) {
                        this.game.bricks.delete(`${x}-${y}`)
                        this.map.board[y][x] = 0
                        this.game.affectedBricks.push({ col: x, row: y })
                        this.flamesPosition.push({ x: x, y: y })
                    }
                    break
                }
                this.flamesPosition.push({ x: x, y: y })
            }
        })
        
        this.flamesPosition.forEach(obj => {
            let mapIndex = `${obj.x}-${obj.y}`
            const lastCellValue = this.game.bombs.has(mapIndex) ? 3 : 0;
            new Flame(this.game, obj, lastCellValue)
        })
        clearTimeout(this.detonationTimeOut)
    }


}