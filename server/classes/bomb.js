// note : handle the detonation timer
export default class Bomb {

    constructor(game, playerId, x, y) {
        this.game = game
        this.playerId = playerId
        this.x =  x
        this.y =  y
        this.detonationCounter = 3
        this.detonationInterval = null
        this.isExploded = false
        this.startDetonationCountDown()
    }

    startDetonationCountDown(){
        this.placeBomb()
        this.detonationInterval = setTimeout(() => {
            setInterval
        }, 3000);
    }

    placeBomb() {
        
    }


    handleExplosion() {
        // todo: handle the bomb flames
    }
}