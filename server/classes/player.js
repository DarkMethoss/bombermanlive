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
            let x = this.x
            let y = this.y
            let playerCenterX = x + this.width / 2
            let playerCenterY = y + this.height / 2
            let { col, row } = this.game.map.getCell(playerCenterX, playerCenterY)
            let cellValue = this.game.map.getCellValue(col, row)
            let isOnBomb = cellValue === 3
            let isWalkable
            let canGetOut

            if (movement === "ArrowRight") {
                x = this.x + deltaTime * this.speed * this.unity
                isWalkable = this.game.map.isWalkable(x + this.width, this.y) && this.game.map.isWalkable(x + this.width, this.y + this.height)
                canGetOut = this.game.map.canGetOut(x + this.width, this.y) && this.game.map.canGetOut(x + this.width, this.y + this.height)
            }
            if (movement === "ArrowLeft") {
                x = this.x - deltaTime * this.speed * this.unity
                isWalkable = this.game.map.isWalkable(x, this.y) && this.game.map.isWalkable(x, this.y + this.height)
                canGetOut = this.game.map.canGetOut(x, this.y) && this.game.map.canGetOut(x, this.y + this.height)
            }
            if (movement === "ArrowUp") {
                y = this.y - deltaTime * this.speed * this.unity
                isWalkable = this.game.map.isWalkable(this.x, y) && this.game.map.isWalkable(this.x + this.width, y)
                canGetOut = this.game.map.canGetOut(this.x, y) && this.game.map.canGetOut(this.x + this.width, y)
            }
            if (movement === "ArrowDown") {
                y = this.y + deltaTime * this.speed * this.unity
                isWalkable = this.game.map.isWalkable(this.x, y + this.height) && this.game.map.isWalkable(this.x + this.width, y + this.height)
                canGetOut = this.game.map.canGetOut(this.x, y + this.height) && this.game.map.canGetOut(this.x + this.width, y + this.height)
            }

            if ((isOnBomb && canGetOut) || isWalkable) {
                this.x = x
                this.y = y
            }
        });

        this.handlePowerUpCollision()

    }


    //  here we'll be handling the player must collide with the player at least at the center 

    handlePowerUpCollision() {
        // see if the center of the player is there !!
        let playerCenterX = this.x + this.width / 2
        let playerCenterY = this.y + this.height / 2

        let { col, row } = this.game.map.getCell(playerCenterX, playerCenterY)
        if (this.game.map.HoldsPowerUp(col, row)) {
            let powerUp = this.game.powerUps.get(`${col}-${row}`);
            powerUp.applyTo(this)
            powerUp.update(this)
            let message = { type: "stats", data: { speed: this.speed, bomb: this.bomb, flame: this.flame } }
            this.ws.send(JSON.stringify(message))
        }

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
