
export class Player {
    constructor(wss, ws, id) {
        this.id = id
        this.ws = ws
        this.hearts = 3
        this.x = null
        this.y = null
        this.width = 40
        this.height = 40
        this.unity = 0.2
        this.bombsPlaced = 0
        this.userName = null
        this.bomb = 1
        this.speed = 1
        this.flame = 1
        this.color = ""
        this.game = null
        this.initialPosition = null
        this.isRespawned = false
        this.livesUp = 0
        this.passBomb = false
        this.passBombs = 0
        this.isLastStanding = true
        this.respanTimeout = null
    }

    isWon() {
        let message = { type: "gameOver", data: { isWon: true } }
        this.ws.send(JSON.stringify(message))
    }

    isLost() {
        let message = { type: "gameOver", data: { isWon: false } }
        this.ws.send(JSON.stringify(message))
    }

    update(deltaTime, playerMovements) {
        console.log(this.game.flames)
        if (playerMovements) this.handlePlayerCollisionWithFlames()
        if (playerMovements) this.handlePlayerMovements(deltaTime, playerMovements)
    }

    handlePlayerMovements(deltaTime, playerMovements) {
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
                x = this.x + deltaTime * this.speed * this.unity * 0.5
                isWalkable = this.game.map.isWalkable(x + this.width, this.y, this) && this.game.map.isWalkable(x + this.width, this.y + this.height, this)
                canGetOut = this.game.map.canGetOut(x + this.width, this.y) && this.game.map.canGetOut(x + this.width, this.y + this.height)
            }
            if (movement === "ArrowLeft") {
                x = this.x - deltaTime * this.speed * this.unity * 0.5
                isWalkable = this.game.map.isWalkable(x, this.y, this) && this.game.map.isWalkable(x, this.y + this.height, this)
                canGetOut = this.game.map.canGetOut(x, this.y) && this.game.map.canGetOut(x, this.y + this.height)
            }
            if (movement === "ArrowUp") {
                y = this.y - deltaTime * this.speed * this.unity * 0.5
                isWalkable = this.game.map.isWalkable(this.x, y, this) && this.game.map.isWalkable(this.x + this.width, y, this)
                canGetOut = this.game.map.canGetOut(this.x, y) && this.game.map.canGetOut(this.x + this.width, y)
            }
            if (movement === "ArrowDown") {
                y = this.y + deltaTime * this.speed * this.unity * 0.5
                isWalkable = this.game.map.isWalkable(this.x, y + this.height, this) && this.game.map.isWalkable(this.x + this.width, y + this.height, this)
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
    // here we need to see if the player mazal madepassash l max dyal 
    handlePowerUpCollision() {
        // see if the center of the player is there !!
        let playerCenterX = this.x + this.width / 2
        let playerCenterY = this.y + this.height / 2

        let { col, row } = this.game.map.getCell(playerCenterX, playerCenterY)
        if (this.game.map.HoldsPowerUp(col, row)) {
            let powerUp = this.game.powerUps.get(`${col}-${row}`);
            if (powerUp.type == 'speed' && this.speed >= this.game.map.maxSpeedpowerUps) {
                return
            }
            if (powerUp.type == 'life' && this.livesUp >= this.game.map.maxLivesUp) {
                return
            }
            if (powerUp.type == 'pass-bomb' && this.passBombs >= this.game.map.maxPassBomb) {
                return
            }
            powerUp.applyTo(this)
            powerUp.update(this)
        }
    }

    handlePlayerCollisionWithFlames() {
        console.log(`2 => `, [...this.game.flames.keys()])

        let up = this.game.map.getCell(this.x, this.y)
        let down = this.game.map.getCell(this.x + this.width, this.y + this.height)

        if (this.game.flames.has(`${up.col}-${up.row}`) || this.game.flames.has(`${down.col}-${down.row}`)) {
            if (this.hearts > 0 && !this.isRespawned) {
                this.hearts--
                this.x = this.initialPosition.x
                this.y = this.initialPosition.y
                this.isRespawned = true
                this.respanTimeout = setTimeout(() => {
                    this.isRespawned = false
                    clearTimeout(this.respanTimeout)
                }, 1000)

                if (this.hearts == 0) {
                    let standPlayers = [...this.game.players.values()].filter((player) => player.isLastStanding)

                    if (standPlayers.length > 1) {
                        let heartPlayers = standPlayers.filter((player) => player.hearts.length > 0)

                        if (heartPlayers.length > 1) {
                            this.isLastStanding = false
                        } else if (heartPlayers.length === 0) {
                            const luckyPlayer = Math.floor(Math.random() * standPlayers.length)
                            standPlayers.forEach((player, index) => index == luckyPlayer ? player.isLastStanding : player.isLastStanding = false)
                        }
                    }
                }
            }

            if (this.hearts <= 0) {
                if (!this.isLastStanding) {
                    this.isLost()
                } else {
                    this.isWon()
                }
            }
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
            color: this.color,
            name: this.userName
        }
    }
}