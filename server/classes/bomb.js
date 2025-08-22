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
        this.positionFlames = [{x: this.x, y: this.y}]
        this.afectedBricks = []
        this.startDetonationCountDown()
        this.handleExplosion()
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
            this.positionFlames.push({x: i, y: this.y})
        }
        // right
        for (let i = this.x + 1; i <= this.x + 3; i++) {
            if (this.game.map.isWalkable2(i, this.y)) {
                if (this.game.map.isBricks(i, this.y)) {
                    this.afectedBricks.push({x: i, y: this.y})
                }
                break
            }
            this.positionFlames.push({x: i, y: this.y})
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
            this.positionFlames.push({x: this.x, y: i})
        }
        // down
        for (let i = this.y + 1; i <= this.y + 3; i++) {
            if (this.game.map.isWalkable2(this.x, i)) {
                if (this.game.map.isBricks(this.x, i)) {
                    this.afectedBricks.push({x: this.x, y: i})
                }
                break
            }
            this.positionFlames.push({x: this.x, y: i})
        }
        console.log("this.afectedBricks", this.afectedBricks)
        console.log("this.positionFlames", this.positionFlames)
    }
}