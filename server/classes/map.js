export class GameMap {
    constructor(parameters, size) {
        this.size = size
        // this is the correct way to initilizz it 
        this.proportion = 0.6
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(0))
        this.generateWalls()
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
    }


    generateBricks() {
        let emptyElements = this.#FindEmptyElementsBoard()
        for (let row = 0; row < this.size; row++) {
            let randomized = Math.round(emptyElements[row].length * this.proportion)
            let indices = Array.from(Array(randomized), () => Math.floor(Math.random() * (this.size - 1)))
            for (let index of indices) {
                if (((row == 1 || row == this.size - 1) && (index == 1 || index == 2 || index == this.size - 2 || index == this.size - 1)) ||
                    ((row == 2 || row == this.size - 2) && (index == 1 || index == this.size - 1))
                ) continue
                if (this.board[row][index] == 0) {
                    this.board[row][index] = 2
                }
            }
        }

        return this.board
    }



    #FindEmptyElementsBoard() {
        const EmptyELements = this.board.map((row, i) => {
            return row.filter((column, j) => column == 0)
        })
        return EmptyELements
    }
}