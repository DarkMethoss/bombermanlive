import Flame from "./flame.js"

// note : handle the detonation timer
export default class Bomb {

    constructor(game, player, x, y, map) {
        this.game = game
        this.player = player
        this.playerId = this.player.id
        this.x = x
        this.y = y
        this.map = map
        this.detonationTimeOut = null
        this.isExploded = false
        this.startDetonationCountDown()
        this.affectedBricks = []
        this.flamesPosition = [{ x: this.x, y: this.y }]
    }

    get position() {
        let scale = this.game.map.width / this.game.map.size
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

    // todo: handle the bomb flames
    handleExplosion() {
        let flameRange = this.player.flame
        for (let i = this.x - 1; i >= this.x - flameRange; i--) { // 3 is range example
            if (this.game.map.isFlameBlocked(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.game.bricks.delete(`${i}-${this.y}`)
                    this.map.board[this.y][i] = 0
                    this.game.affectedBricks.push({ x: i, y: this.y })
                    this.flamesPosition.push({ x: i, y: this.y })
                }
                break
            }
            this.flamesPosition.push({ x: i, y: this.y })
        }
        for (let i = this.x + 1; i <= this.x + flameRange; i++) {
            if (this.game.map.isFlameBlocked(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.game.bricks.delete(`${i}-${this.y}`)
                    this.map.board[this.y][i] = 0
                    // this.affectedBricks.set(`${this.y}-${i}`, {})
                    this.game.affectedBricks.push({ x: i, y: this.y })
                    this.flamesPosition.push({ x: i, y: this.y })
                }
                break
            }
            this.flamesPosition.push({ x: i, y: this.y })
        }
        for (let i = this.y - 1; i >= this.y - flameRange; i--) {
            if (this.game.map.isFlameBlocked(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.game.bricks.delete(`${this.x}-${i}`)
                    this.map.board[i][this.x] = 0
                    this.game.affectedBricks.push({ x: this.x, y: i })
                   this.flamesPosition.push({ x: this.x, y: i })
                }
                break
            }
            this.flamesPosition.push({ x: this.x, y: i })
        }
        for (let i = this.y + 1; i <= this.y + flameRange; i++) {
            if (this.game.map.isFlameBlocked(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    // what about delete them from the map direclty 
                    this.game.bricks.delete(`${this.x}-${i}`)
                    this.map.board[i][this.x] = 0
                    this.game.affectedBricks.push({ x: this.x, y: i })
                    this.flamesPosition.push({ x: this.x, y: i })
                }
                break
            }
            this.flamesPosition.push({ x: this.x, y: i })
        }


        this.flamesPosition.forEach(obj => {
            let mapIndex = `${obj.x}-${obj.y}`
            const flame = new Flame(this.game, obj)
            this.game.flames.has(mapIndex) ? this.game.flames.get(mapIndex).push(flame) : this.game.flames.set(mapIndex, [flame]);
        })
        clearTimeout(this.detonationTimeOut)
    
    }




    

    
}