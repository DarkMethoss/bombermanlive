// 0: empty space
// 1: Wall
// 2: Brick
// 3: bomb
// 4: flame
// 5: powerup
// 51 speed
// 52 bomb
// 53 flame 
// 54 life 
// 55 pass-bomb
import { powerUp } from "./powerup.js"


export default class GameMap {
    constructor(game, size) {
        this.game = game
        this.width = 750
        this.height = 750
        this.size = size
        this.proportionBricks = 1
        this.board = Array(this.size).fill(0).map(() => Array(this.size).fill(0))
        this.generateBricks()
        this.generatePowerUps()
        this.generatePowerUpsBonus()
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
        let powerUpKeys = ['bomb', 'bomb', 'bomb', 'bomb', 'flame', 'flame', 'flame', 'flame', 'speed', 'speed']
        if (this.game.bricks.length != 0) {
            let countSpeed = 0
            let powerUpsIndices = this.#getUniqueIndices(this.game.bricks, 0.1)
            powerUpsIndices.forEach((element) => {
                this.#shuffle(powerUpKeys)
                let powerUpKeyIndex = Math.floor(Math.random() * (powerUpKeys.length - 1))
                let positionXY = Array.from(this.game.bricks)[element]
                //  now 3awtani khassni nrdha map 
                if (powerUpKeys[powerUpKeyIndex] == 'speed') {
                    if (countSpeed >= (this.game.players.size * this.game.maxSpeedpowerUps)) return
                    countSpeed += 1
                }
                this.game.powerUps.set(positionXY[0],
                    new powerUp(this.game, powerUpKeys[powerUpKeyIndex], positionXY[1], positionXY[0])
                )


            })
        }

    }



    generatePowerUpsBonus() {
        let powerUpBonusKeys = ['speed', 'pass-bomb']
        let availableBricksMap = new Map()
        if (this.game.bricks.length != 0) {
            [...this.game.bricks.entries()].map((value) => {
                if (!this.game.powerUps.has(value[0])) {
                    availableBricksMap.set(value[0], value[1])
                }
            })
            let powerUpsIndices = this.#getUniqueIndices(availableBricksMap, 0.05)
            let countLives = 0
            let countPassBomb = 0
            powerUpsIndices.forEach((element) => {
                this.#shuffle(powerUpBonusKeys)
                let powerUpKeyIndex = Math.floor(Math.random() * (powerUpBonusKeys.length - 1))
                let positionXY = Array.from(this.game.bricks)[element]
                if (powerUpBonusKeys[powerUpKeyIndex] == 'life') {
                    if (countLives >= (this.game.players.size * this.game.maxLivesUp)) return
                    countLives += 1
                }
                if (powerUpBonusKeys[powerUpKeyIndex] == 'pass-bomb') {
                    if (countPassBomb >= (this.game.players.size * this.game.maxPassBomb)) return
                    countPassBomb += 1
                }
                this.game.powerUps.set(positionXY[0],
                    new powerUp(this.game, powerUpBonusKeys[powerUpKeyIndex], positionXY[1], positionXY[0])
                )

            })
        }

    }


    HoldsPowerUp(col, row) {
        return this.game.powerUps.has(`${col}-${row}`)
    }


    isWalkable(x, y, player) {
        const { col, row } = this.getCell(x, y)
        let cellValue = this.board[row][col]
        if (player.passBomb) return ![1, 2].includes(cellValue)
        else return ![1, 2, 3].includes(cellValue)
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
        const EmptyELements = this.board.map((row) => {
            return row.filter((column) => column == 0)
        })
        return EmptyELements
    }

    // for later to make it generic for everyithing 

    #getUniqueIndices(arr, proportion) {
        const indices = new Set()
        const maxIndex = arr.size - 1
        let proportionPowerUps = Math.round(maxIndex * proportion * this.game.players.size)
        while (indices.size < proportionPowerUps) {
            const randomIndex = Math.floor(Math.random() * maxIndex)
            indices.add(randomIndex)
        }

        return [...indices]
    }


    #shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}