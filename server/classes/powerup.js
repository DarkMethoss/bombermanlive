//  this is the class mère e7m
// we will have 3 subclasses for each type and the



class powerUp {
    constructor(game, icon, type) {
        this.game = game
        this.icon = icon
        this.type = type
        this.active = false   // tcollectat  
        this.onwer = null

    }


    //  here we need to associate the player and the the powerUp
    //  the logic of how each one will be handled by the player
    applyTo(player) {
        this.active = true
        this.onwer = player
    }


    update(player) {
        switch (this.type) {
            case 'speed':
                player.playerData.speed = 2
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



}


//  may be we won't be needing to create it 
// class BombPowerUp extends powerUp {
//     constructor(game, icon, duration) {
//         super(game, icon, duration)

//     }
// }