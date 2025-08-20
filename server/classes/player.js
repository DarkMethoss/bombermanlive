export class Player {
    constructor(wss, ws, id) {
        this.id = id
        this.ws = ws
        // this.wss = wss
        this.hearts = 3
        this.x = null
        this.y = null
        this.unity = 0.1
        this.bomb = 1
        this.speed = 1
        this.flame = 1
        this.color = ""
        this.game = null
    }

    isWon() {
        let message = { type: "gameOver", data: { isWon: true } }
        this.ws.send(JSON.stringify(message))
    }

    isLost() {

    }

    update(deltaTime, playerMovements) {
        // console.log(this.x, this.y, this.deltaTime * this.speed * this.unity)
        // return
        playerMovements.forEach(movement => {
            let bordWidth = this.game.map.width
            let cellWidth = bordWidth / this.game.map.size
            console.log(movement)
            if (movement === "ArrowRight") {
                let x = this.x + deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(x + cellWidth, this.y)
                let { col } = this.game.map.getCell(x + cellWidth, this.y)
                if (isWalkable) this.x = x
                if (!isWalkable) this.x = (col * cellWidth) - cellWidth
            }
            if (movement === "ArrowLeft") {
                let x = this.x - deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(x, this.y)
                let { col } = this.game.map.getCell(x, this.y)
                if (isWalkable) this.x = x
                if (!isWalkable) this.x = (col * cellWidth) + cellWidth
            }
            if (movement === "ArrowUp") {
                let y = this.y - deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(this.x, y)
                let { row } = this.game.map.getCell(this.x, y + cellWidth)
                if (isWalkable) this.y = y
                if (!isWalkable) this.y = (row * cellWidth) + cellWidth
            }
            if (movement === "ArrowDown") {
                let y = this.y + deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(this.x, y)
                let { row } = this.game.map.getCell(this.x, y + cellWidth)
                if (isWalkable) this.y = y
                if (!isWalkable) this.y = (row * cellWidth) - cellWidth
            }
        });

        console.log(this.x, this.y)
    }





    get playerData() {
        return {
            hearts: this.hearts,
            x: this.x,
            y: this.y,
            bomb: this.bomb,
            speed: this.speed,
            flame: this.flame,
            color: this.color
        }
    }


}