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
        // this.flame = new Flames(this.game, this)
        this.startDetonationCountDown()
        this.handleExplosion()
        this.handleExplosion22()
    }

    startDetonationCountDown(){
        this.detonationInterval = setInterval(()=>{
            if (this.detonationCounter > 0 ){
                this.detonationCounter--
            }
            this.isExploded = true
        }, 1000)
    }

    handleExplosion() {
        // todo: handle the bomb flames
        console.log(this.game.map.board)
        // Horisontal
        // left
        for (let i = this.x - 1; i <= this.x - 3; i--) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        // right
        for (let i = this.x + 1; i <= this.x + 3; i++) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        // vertical
        // up
        for (let i = this.y - 1; i <= this.y - 3; i--) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }
        // down
        for (let i = this.y + 1; i <= this.y + 3; i++) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }

        console.log("this.afectedBricks", this.afectedBricks)
        console.log("this.flamesPosition", this.flamesPosition)

        this.flamesPosition.forEach(obj => {
            let mapIndex = `${obj.x}-${obj.y}`;
            const flame = new Flame(this.game, obj);

            this.game.flames[mapIndex]? this.game.flames[mapIndex].push(flame) : this.game.flames.set(mapIndex, flame);
        })

        console.log("this.game.flames ==>", this.game.flames)
        // this.flame.flamesPosition = this.flamesPosition;
    }

    handleExplosion22() {
        // todo: handle the bomb flames
        console.log(this.game.map.board)
        // Horisontal
        // left
        // this.x = 3
        // this.y = 1

        for (let i = this.x - 1; i <= this.x - 3; i--) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        // right
        for (let i = this.x + 1; i <= this.x + 3; i++) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.flamesPosition.push({x: i, y: this.y})
        }
        // vertical
        // up
        for (let i = this.y - 1; i <= this.y - 3; i--) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }
        // down
        for (let i = this.y + 1; i <= this.y + 3; i++) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.flamesPosition.push({x: this.x, y: i})
        }

        console.log("this.afectedBricks", this.afectedBricks)
        console.log("this.flamesPosition", this.flamesPosition)

        this.flamesPosition.forEach(obj => {
            let mapIndex = `${obj.x}-${obj.y}`;
            let mapValue = this.game.flames.get(mapIndex) || []
            const flame = new Flame(this.game, obj)
            console.log("map value",mapValue)
            mapValue.push(flame)
            this.map.flames.set(mapIndex,mapValue)

            // this.game.flames[mapIndex]? this.game.flames[mapIndex].push(flame) : this.game.flames.set(mapIndex, flame);
        })

        console.log("this.game.flames ==>", this.game.flames)
        // this.flame.flamesPosition = this.flamesPosition;
    }
}