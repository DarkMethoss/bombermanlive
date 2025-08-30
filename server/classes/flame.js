export default class Flame {
    constructor(game, position, lastCellValue) {
        this.game = game
        this.x = position.x
        this.y = position.y
        this.lastCellValue = lastCellValue
        this.flameTimer = null
        this.flamesCounter()
    }

    get position(){
        let scale = this.game.map.width / this.game.map.size 
        return {
            x : this.x * scale,
            y : this.y * scale
        }
    }

    flamesCounter() {
        this.game.map.board[this.y][this.x] = 4;
        
        [...this.game.players.values()].forEach((player) => {
            player.handlePlayerCollisionWithFlames()
        })

        this.flameTimer = setTimeout(() => {
            let key = `${this.x}-${this.y}`;
            let flames = this.game.flames.get(key)

            // check if contains more than one flame
            if (flames.length > 1) {
                this.game.flames.get(key).pop()
            } else {
                this.game.flames.delete(key)
                this.game.map.board[this.y][this.x] = this.lastCellValue
            }

            clearInterval(this.flameTimer)
        }, 500)
    }
}



/// timer 20 //// 10