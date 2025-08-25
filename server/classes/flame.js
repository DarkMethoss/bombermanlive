export default class Flame {
    constructor(game, position) {
        this.x = position.x;
        this.y = position.y;
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
        this.game.map.board[this.y][this.x] = 4

        this.handleFlamesCollisionWithPlayer([...this.game.players.values()])

        setTimeout(() => {
            let key = `${this.x}-${this.y}`;
            let values = this.game.flames.get(key)

            if (values.length > 1) {
                // check if contains more than one flame
                this.game.flames.get(key).pop()
            } else {
                // should remove flame from the map 4 => 0
                this.game.flames.delete(key)
                this.game.map.board[this.y][this.x] = 0
            }
        }, 1000)
    }

    handleFlamesCollisionWithPlayer(players) {
        players.forEach(player => {
            let up = this.game.map.getCell(player.x, player.y)
            let down = this.game.map.getCell(player.x + player.width, player.y + player.height)
            const check = (grid) => this.x == grid.col && this.y == grid.row

            if (check(up) || check(down)) {
                player.hearts--
                player.x = player.initialPosition.x
                player.y = player.initialPosition.y
                console.log("player ff", player)
            }
        })
    }
}