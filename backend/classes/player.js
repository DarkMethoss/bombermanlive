export class Player {
    constructor(wss, ws, id, roomId) {
        this.id = id
        this.roomId
        this.ws = ws
        this.wss = wss
        // this.x = pos.x
        // this.y = pos.y
        this.bomb = 1
        this.speed = 1
        this.flame = 1
    }
}