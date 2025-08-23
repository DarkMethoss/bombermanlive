export default class Flame {
    constructor(game, position) {
        this.x = position.x;
        this.y = position.y;
        this.game = game;
        this.flameId = Math.random().toString(16);
        this.flamesCounter()
    }

    flamesCounter() {
        console.log("here inside flame with id:", this.flameId)
        console.log("Board:", this.game.map.board)
        // should update map when cell contains flames
        console.log("before", this.game.map.board[this.y][this.x])
        this.game.map.board[this.y][this.x] = 4
        console.log("after", this.game.map.board[this.y][this.x])


        setTimeout(() => {
            let key = `${this.x}-${this.y}`;
            let values = this.game.flames.get(key)

            if (values.length > 1) {
                // check if contains more than one flame
                this.game.flames.get(key).pop()
                console.log("pooooop")
            } else {
                // should remove flame from the map 4 => 0
                this.game.flames.delete(key)
                this.game.map.board[this.y][this.x] = 0
                console.log("deleteeeeee")
            }

            console.log("game flames inside timeout", this.game.flames.get(key))
            console.log("last Board:", this.game.map.board)

        }, 5000)
    }
}