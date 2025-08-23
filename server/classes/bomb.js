import Flame from "./flame.js"

// note : handle the detonation timer
export default class Bomb {

    constructor(game, playerId, x, y) {
        // this.placer = playerId
        this.game = game
        this.playerId = playerId
        this.x =  this.game.map.getCell(x, y).col
        this.y =  this.game.map.getCell(x, y).row
        this.detonationCounter = 3
        this.detonationInterval = null
        this.isExploded = false
        this.flamesPosition = [{x: this.x, y: this.y}]
        this.afectedBricks = []
        this.handleExplosion()
        this.handleExplosion22()
        // this.startDetonationCountDown()
        console.log("rrrrrrrrrrrrrrrrrrrr", this.game.room.players.get(playerId))
    }

    startDetonationCountDown(){
        this.detonationInterval = setTimeout(()=>{
            if (this.detonationCounter > 0 ){
                this.detonationCounter--
            }
            this.isExploded = true
        }, 1000)
    }

    // todo: handle the bomb flames
    handleExplosion() {
        for (let i = this.x - 1; i <= this.x - 3; i--) { // 3 is range example
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        for (let i = this.x + 1; i <= this.x + 3; i++) { // 3 is range example
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        for (let i = this.y - 1; i <= this.y - 3; i--) { // 3 is range example
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }
        for (let i = this.y + 1; i <= this.y + 3; i++) { // 3 is range example
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }
    }

    handleExplosion22() {
        for (let i = this.x - 1; i <= this.x - 3; i--) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        for (let i = this.x + 1; i <= this.x + 3; i++) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        for (let i = this.y - 1; i <= this.y - 3; i--) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }
        for (let i = this.y + 1; i <= this.y + 3; i++) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }

        this.flamesPosition.forEach(obj => {
            let mapIndex = `${obj.x}-${obj.y}`
            const flame = new Flame(this.game, obj)
            this.game.flames.has(mapIndex)? this.game.flames.get(mapIndex).push(flame) : this.game.flames.set(mapIndex, [flame]);
        })
        console.log("this.game.flames ==>", this.game.flames)
    }
}