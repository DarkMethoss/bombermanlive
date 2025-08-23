//  this is the class mère e7m
// we will have 3 subclasses for each type and the



export class powerUp {
    constructor(game, type, position) {
        this.game = game
        // this.icon = icon    // to be got from the type of the speed 
        this.type = type
        this.active = false   // tcollectat  
        this.owner = null
        this.position = position

    }


    //  here we need to associate the player and the the powerUp
    //  the logic of how each one will be handled by the player

    // when there is a collision we can tie the player to the powerUp
    applyTo(player) {
        this.active = true
        this.owner = player
    }


    update(player) {
        switch (this.type) {
            case 'speed':
                player.speed += 1
                break;
            case 'bomb':
                break
            case 'range':
                break
        }


    }


    // hna we need to remove the powerUp from the game

    remove() {
        let exists = this.game.powerUps.indexOf(this)
        if (exists != -1) {
            this.game.powerUps.splice(exists, 1)

        }

    }

    toJSON() {
        return {
            type: this.type,
            position: this.position
        };
    }



}


//  may be we won't be needing to create it 
// class BombPowerUp extends powerUp {
//     constructor(game, icon, duration) {
//         super(game, icon, duration)

//     }
// }