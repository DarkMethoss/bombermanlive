// note : handle the detonation timer
export default class Bomb {

    constructor(game, player, x, y) {
        this.game = game
        this.player = player
        this.playerId = this.player.id
        this.x =  x
        this.y =  y
        this.detonationTimeOut = null
        this.isExploded = false
        this.startDetonationCountDown()
        console.log("new Bomb placed ", this.x , this.y)
    }

    get position(){
        let scale = this.game.map.width / this.game.map.size 
        return {
            x : this.x * scale,
            y : this.y * scale
        }
    }

    startDetonationCountDown(){
        console.log("inside the start countdown value: ", this.game.map.board[this.y][this.x])
        this.game.map.board[this.y][this.x] = 3
        this.detonationTimeOut = setTimeout(() => {
            this.game.bombs.delete(`${this.x}-${this.y}`)
            this.player.bombsPlaced--
            this.handleExplosion()
            
        }, 3000);
    }

    handleExplosion() {
        clearTimeout(this.detonationTimeOut)
        console.log("bomb exploded")
        // todo: handle the bomb flames
    }
}