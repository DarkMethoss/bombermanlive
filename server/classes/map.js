// 0: empty space
// 1: Wall
// 2: Brick
// 3: bomb
// 4: flame
// 5: powerup

export default class GameMap {
    constructor(game, size) {
        this.game = game
        this.width = 750
        this.height = 750
        this.size = size
        this.proportion = 0.7
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
            let indices = new Set(Array.from(Array(randomized), () => Math.floor(Math.random() * (this.size - 1))))
            for (let col of [...indices.values()]) {
                if (((row == 1 || row == this.size - 2) && (col == 1 || col == 2 || col == this.size - 2 || col == this.size - 3)) ||
                    ((row == 2 || row == this.size - 3) && (col == 1 || col == this.size - 2))
                ) continue
                if (this.board[row][col] == 0) {
                    this.game.bricks.push({ x: col * 750 / 15, y: row * 750 / 15 })
                    this.board[row][col] = 2
                }
            }
        }
        console.log(`size:${this.game.bricks.length}`,this.game.bricks)
    }

    isWalkable(x,y){
        const {col,row} = this.getCell(x, y)
        let cellValue = this.board[row][col]
        return cellValue != 1
    }

    getCellValue(col,row) {
        return this.board[row][col]
    }

    getCell(x,y) {
        let col = Math.floor(x / (this.width / this.size))
        let row = Math.floor(y / (this.height / this.size))
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