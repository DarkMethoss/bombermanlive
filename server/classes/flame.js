export default class Flame {
    constructor(game, position, lastCellValue) {
        this.game = game
        this.x = position.x
        this.y = position.y
        this.lastCellValue = lastCellValue
        this.flameTimer = null
        this.flamesCounter()
    }

    get position() {
        let scale = this.game.map.width / this.game.map.size
        return {
            x: this.x * scale,
            y: this.y * scale
        }
    }

    flamesCounter() {
        console.log(`3 => `, [...this.game.flames.keys()])
        let index = `${this.x}-${this.y}`
        this.game.flames.has(index) ? this.game.flames.get(index).push(this) : this.game.flames.set(index, [this]);

        this.game.map.board[this.y][this.x] = 4;
        [...this.game.players.values()].forEach((player) => {
            player.handlePlayerCollisionWithFlames({ x: this.x, y: this.y })
        })

        this.flameTimer = setTimeout(() => {
            let flames = this.game.flames.get(index)

            // check if contains more than one flame
            if (flames.length > 1) {
                this.game.flames.get(index).pop()
            } else {
                this.game.flames.delete(index)
                this.game.map.board[this.y][this.x] = this.lastCellValue
            }
            clearTimeout(this.flameTimer)
        }, 1000)
    }
}