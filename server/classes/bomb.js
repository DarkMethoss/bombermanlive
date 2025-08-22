// note : handle the detonation timer
export default class Bomb {

    constructor(game, playerId, x, y) {
        // this.placer = playerId
        this.game = game
        this.playerId = playerId
        this.x =  x
        this.y =  y
        this.detonationCounter = 3
        this.detonationInterval = null
        this.isExploded = false
        this.startDetonationCountDown()
    }






    startDetonationCountDown(deltaTime){
    
        this.detonationInterval = setInterval(()=>{
            if (this.detonationCounter > 0 ){
                this.detonationCounter--
            }
            this.isExploded = true
        }, 1000)
    }

    handleExplosion() {

    }
}