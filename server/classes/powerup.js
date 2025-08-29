
export class powerUp {
    constructor(game, type, position, id) {
        this.id = id
        this.game = game
        this.type = type
        this.owner = null
        this.position = position
    }
    //  here we need to associate the player and the the powerUp
    //  the logic of how each one will be handled by the player
    // when there is a collision we can tie the player to the powerUp
    applyTo(player) {
        this.owner = player
    }
    //  this is too basic
    update(player) {
        switch (this.type) {
            case 'speed':
                player.speed += 1
                this.remove()
                break;
            case 'bomb':
                player.bomb += 1
                this.remove()
                break;
            case 'flame':
                player.flame += 1
                this.remove()
                break
            case 'life':
                player.livesUp += 1
                player.hearts += 1
                this.remove()
                break;
            case 'pass-bomb':
                player.passBomb = true
                player.passBombs += 1
                this.remove()
                break;
        }


    }




    // hna we need to remove the powerUp from the game
    // if a one is used we need to decrement ( wttf 3la task )
    remove() {
        let exists = this.game.powerUps.get(this.id)
        if (exists) {
            let { col, row } = this.game.map.getCell(exists.position.x, exists.position.y)
            this.game.powerUps.delete(this.id)
            this.game.map.board[row][col] = 0
        }
    }

    toJSON() {
        // Return a new object with only the desired properties for JSON serialization
        return {
            type: this.type,
            position: this.position
        };
    }

}

