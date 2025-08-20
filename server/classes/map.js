export default class GameMap {
    constructor(game, size) {
        this.game = game
        this.width = 700
        this.size = size
        // this is the correct way to initilizz it 
        this.proportion = 1
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(0))
        this.generateBricks()
    }

    generateWalls() {
        for (let row = 0; row < this.size; row++) {
            for (let column = 0; column < this.size; column++) {
                if ((row == 0 || row == this.size - 1 || column == 0 || column == this.size - 1) || (row % 2 == 0 && column % 2 == 0)) {
                    this.board[row][column] = 1
                }
            }
        }
        this.game.initialBoard = JSON.parse(JSON.stringify(this.board))
    }



    generateBricks() {
        this.generateWalls()
        let emptyElements = this.#FindEmptyElementsBoard()
        for (let row = 0; row < this.size; row++) {
            let randomized = Math.round(emptyElements[row].length * this.proportion)
            let indices = Array.from(Array(randomized), () => Math.floor(Math.random() * (this.size - 1)))
            for (let index of indices) {
                if (((row == 1 || row == this.size - 2) && (index == 1 || index == 2 || index == this.size - 2 || index == this.size - 3)) ||
                    ((row == 2 || row == this.size - 3) && (index == 1 || index == this.size - 2))
                ) continue
                if (this.board[row][index] == 0) {
                    console.log("gaaaaaame briiiiiicks: ", this.game.bricks)
                    this.game.bricks.push({ x: index * 700 / 15, y: row * 700 / 15 })
                    this.board[row][index] = 2
                }
            }
        }
    }

    isWalkable(x,y){
        const {col,row} = this.getCell(x, y)
        console.log("cooooooooooool, roooooooooow", col, row)



        let cellValue = this.board[row][col]

        console.log(cellValue)
        return cellValue !== 1
    }
    
    getCell(x,y) {

        let col = Math.ceil(x / (this.width / this.size)) -1
        let row = Math.ceil(y / (this.width / this.size)) -1
        
        console.log("from to pixel to grid", `${x},${y}=====> ${col},${row}`)

        if (row >= this.size) row = this.size -1
        if (row < 0) row = 0
        if (col >= this.size) col = this.size -1
        if (col < 0) col = 0

        return {col, row}
    }


    #FindEmptyElementsBoard() {
        const EmptyELements = this.board.map((row, i) => {
            return row.filter((column, j) => column == 0)
        })
        return EmptyELements
    }
}