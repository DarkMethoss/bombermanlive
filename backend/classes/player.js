export class Player {
    constructor(wss, ws, id) {
        this.id = id
        this.ws = ws
        this.wss = wss
        this.x = null
        this.y = null
        this.bomb = 1
        this.speed = 1
        this.flame = 1

    }
    
    isWon() {
        let message = { type: "gameOver", data: { isWon: true } }
        this.ws.send(JSON.stringify(message))
    }

    isLost() {

    }

    

}