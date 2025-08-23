export class Player {
    constructor(wss, ws, id) {
        this.id = id
        this.ws = ws
        this.hearts = 3
        this.x = null
        this.y = null
        this.width = 40
        this.height = 40
        this.unity = 0.1
        this.bombsPlaced = 0
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
        playerMovements.forEach(movement => {
            if (movement === "ArrowRight") {
                let x = this.x + deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(x + this.width, this.y) && this.game.map.isWalkable(x + this.width, this.y + this.height)
                if (isWalkable) this.x = x
            }
            if (movement === "ArrowLeft") {
                let x = this.x - deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(x, this.y) && this.game.map.isWalkable(x, this.y + this.height)
                if (isWalkable) this.x = x
            }
            if (movement === "ArrowUp") {
                let y = this.y - deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(this.x, y) && this.game.map.isWalkable(this.x + this.width, y)
                if (isWalkable) this.y = y
            }
            if (movement === "ArrowDown") {
                let y = this.y + deltaTime * this.speed * this.unity
                let isWalkable = this.game.map.isWalkable(this.x, y + this.height) && this.game.map.isWalkable(this.x + this.width, y + this.height)
                if (isWalkable) this.y = y
            }
        });



        //  let's see if we can test or see if there is a collision between a player and a the power UP 
        let { col, row } = this.game.map.getCell(this.x, this.y)
        // access the place of the hardcoded shit 

        if (this.game.map.HoldsPowerUp(col, row)) {
            let data = this.game.powerUpsHardCoded.get(JSON.stringify({ col: col, row: row }));
            data.applyTo(this)
            let { speed, id } = data.owner
            console.log("the player who got the speed", speed, id);
            data.update(this)
            console.log("the speeed after", speed);
        }
        console.log('player current position: ', this.game.map.getCell(this.x, this.y));
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
