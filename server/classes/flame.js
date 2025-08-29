export default class Flame {
    constructor(game, position, lastCellValue) {
        this.x = position.x;
        this.y = position.y;
        this.lastCellValue = lastCellValue;
        this.game = game;
        this.flamesCounter();
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

        setTimeout(() => {
            let key = `${this.x}-${this.y}`;
            let values = this.game.flames.get(key)

            if (values.length > 1) {
                // check if contains more than one flame
                this.game.flames.get(key).pop()
            } else {
                // should remove flame from the map 4 => 0
                this.game.flames.delete(key)
                this.game.map.board[this.y][this.x] = this.lastCellValue
            }
        }, 500)
    }
}