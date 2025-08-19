export default class Game {
    constructor(room) {
        this.room = room
        this.map = new Map()
        this.blocks = []
        this.powerUps = []
        this.bombs = []
        this.startPositions = [{ col: 1, row: 1 }, { col: 13, row: 13 }, { col: 1, row: 13 }, { col: 13, row: 1 }]
    }

    update(data){
        const {deltaTime, playerMovements} = data
        if (!playerMovements) return 
        console.log("Updating the game: ",deltaTime, playerMovements)   
    }

    getGameData(){
        
        return {
            blocks: this.blocks,
            powerUps: this.powerUps,
            bombs: this.powerUps,
        }
    }
}