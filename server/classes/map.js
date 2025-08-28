// 0: empty space
// 1: Wall
// 2: Brick
// 3: bomb
// 4: flame
// 5: powerup
// 51 speed
// 52 bomb
// 53 flame 

import { powerUp } from "./powerup.js"


export default class GameMap {
    constructor(game, size) {
        this.game = game
        this.width = 750
        this.height = 750
        this.size = size
        this.proportionBricks = 0.8
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(0))
        this.generateBricks()
        this.generatePowerUps()
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
        this.generateWalls()
        let emptyElements = this.#FindEmptyElementsBoard()
        for (let row = 0; row < this.size; row++) {
            let randomized = Math.round(emptyElements[row].length * this.proportionBricks)
            let indices = new Set(Array.from(Array(randomized), () => Math.floor(Math.random() * (this.size - 1))).sort((a, b) => a - b))
            for (let col of [...indices.values()]) {
                if (((row == 1 || row == this.size - 2) && (col == 1 || col == 2 || col == this.size - 2 || col == this.size - 3)) ||
                    ((row == 2 || row == this.size - 3) && (col == 1 || col == this.size - 2))
                ) continue
                if (this.board[row][col] == 0) {
                    let mapIndex = `${col}-${row}`
                    let mapValue = { x: col * 750 / 15, y: row * 750 / 15 }
                    this.game.bricks.set(mapIndex, mapValue)
                    this.board[row][col] = 2
                }
            }
        }
    }

    // we need 
    generatePowerUps() {
        // shuflle the array to (more randomness)
        let powerUpKeys = ['bomb', 'speed', 'life', 'bomb', 'bomb', 'flame', 'bomb', 'flame', 'speed', 'flame']
        if (this.game.bricks.length != 0) {
            let powerUpsIndices = this.#getUniqueIndices(this.game.bricks)
            powerUpsIndices.forEach((element) => {
                //  generate u salaam
                this.#shuffle(powerUpKeys)
                console.log("the powerUpskeys", powerUpKeys);
                let powerUpKeyIndex = Math.floor(Math.random() *(powerUpKeys.length-1))
                let positionXY = Array.from(this.game.bricks)[element]
                //  now 3awtani khassni nrdha map 
                this.game.powerUps.set(positionXY[0],
                    new powerUp(this.game, powerUpKeys[powerUpKeyIndex], positionXY[1], positionXY[0])
                )


            })
        }

    }


    HoldsPowerUp(col, row) {
        return this.game.powerUps.has(`${col}-${row}`)
    }


    isWalkable(x, y) {
        const { col, row } = this.getCell(x, y)
        let cellValue = this.board[row][col]
        return ![1, 2, 3].includes(cellValue)
    }

    canGetOut(x, y) {
        const { col, row } = this.getCell(x, y)
        let cellValue = this.board[row][col]
        return ![1, 2].includes(cellValue)
    }

    isFlameBlocked(col, row) { // check blocks iteam by grid
        return [1, 2].includes(this.getCellValue(col, row))
    }

    isBricks(col, row) {
        return this.getCellValue(col, row) == 2
    }

    getCellValue(col, row) {
        return this.board[row][col]
    }

    getCell(x, y) {
        let col = Math.floor(x / (this.width / this.size))
        let row = Math.floor(y / (this.height / this.size))
        if (row >= this.size) row = this.size - 1
        if (row < 0) row = 0
        if (col >= this.size) col = this.size - 1
        if (col < 0) col = 0
        return { col, row }
    }

    #FindEmptyElementsBoard() {
        const EmptyELements = this.board.map((row, i) => {
            return row.filter((column, j) => column == 0)
        })
        return EmptyELements
    }

    // for later to make it generic for everyithing 
    // 
    #getUniqueIndices(arr) {
        const indices = new Set()
        const maxIndex = arr.size - 1
        let proportionPowerUps = Math.round(maxIndex * 0.1 * this.game.players.size)
        console.log("proportion", proportionPowerUps);
        while (indices.size < proportionPowerUps) {
            const randomIndex = Math.floor(Math.random() * (maxIndex + 1))
            indices.add(randomIndex)
        }

        return [...indices]
    }


    #shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}