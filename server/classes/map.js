export default class GameMap {
    constructor(game, size) {
        this.game = game
        this.width = 750
        this.height = 750
        this.cols = size.cols
        this.rows = size.rows
        this.proportion = 1
        this.board = Array(this.rows).fill(0).map(() => Array(this.cols).fill(0))
        this.generateBricks()
    }

    generateWalls() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.cols; column++) {
                if ((row == 0 || row == this.rows - 1 || column == 0 || column == this.cols - 1) || (row % 2 == 0 && column % 2 == 0)) {
                    this.board[row][column] = 1
                }
            }
        }
        this.game.initialBoard = JSON.parse(JSON.stringify(this.board))
    }

    generateBricks() {
        this.generateWalls()
        let emptyElements = this.#FindEmptyElementsBoard()
        for (let row = 0; row < this.rows; row++) {
            let randomized = Math.round(emptyElements[row].length * this.proportion)
            let indices = Array.from(Array(randomized), () => Math.floor(Math.random() * (this.cols - 1)))
            for (let col of indices) {
                if (((row == 1 || row == this.rows - 2) && (col == 1 || col == 2 || col == this.cols - 2 || col == this.cols - 3)) ||
                    ((row == 2 || row == this.rows - 3) && (col == 1 || col == this.cols - 2))
                ) continue
                if (this.board[row][col] == 0) {
                    this.game.bricks.push({ x: col * 700 / 15, y: row * 700 / 15 })
                    this.board[row][col] = 2
                }
            }
        }
    }

    isWalkable(x,y){
        const {col,row} = this.getCell(x, y)
        let cellValue = this.board[row][col]
        return cellValue != 1
    }

    getCell(x,y) {
        let col = Math.floor(x / (this.width / this.cols))
        let row = Math.floor(y / (this.height / this.rows))
        if (row >= this.rows) row = this.rows -1
        if (row < 0) row = 0
        if (col >= this.cols) col = this.cols -1
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