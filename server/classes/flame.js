export default class Flame {
    constructor(game, position) {
        this.x = position.x;
        this.y = position.y;
        this.game = game;
    }

    flamesCounter() {
        setTimeout(() => {
            this.game.flames.delete(`${this.x}-${this.y}`)
        }, 1000)
    }
}