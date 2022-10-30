import {cellMap} from "../resource/cellMap.js";
import {obstacle, bulb, crossingBulbs, dark, bright, obstacleWithCorrectAmountBulb} from "./references.js";
import {render} from "./renderer.js";

export class State {
    #name;
    #board;
    #updating;

    constructor() {
        this.#name = "";
        this.#board = null;
        this.#updating = false;
    }

    loadLevel(name, level) {
        this.#name = name;
        this.#board = [];
        for (let y = 0; y < level.length; y++) {
            this.#board[y] = [];
            for (let x = 0; x < level[y].length; x++) {
                this.#board[y][x] = cellMap.extract(level[y][x]);
            }
        }
    }

    async update(x, y) {
        let finished = false;
        if (!this.#isObstacle(x, y)) {
            this.#updating = true
            this.#putBulb(x, y);
            await this.#spreadLight(x, y);
            this.#checkBulbAmountOfObstacles();
            finished = this.#isGameOver();
            this.#updating = false;
        }
        return finished;
    }

    #putBulb(x, y) {
        if (this.#board[y][x].value === "") {
            this.#board[y][x].value = bulb;
            this.#board[y][x].lightSourceCount++;
        } else {
            this.#board[y][x].value = "";
            this.#board[y][x].lightSourceCount--;
        }
        this.#paintCell(x, y)
        render(this.#board);
    }

    async #spreadLight(x, y, offset = 1, directions = [true, true, true, true]) {
        await this.#sleep(100);
        if (directions[0]) directions[0] = this.#checkSide(x, y, x, y - offset);
        if (directions[1]) directions[1] = this.#checkSide(x, y, x, y + offset);
        if (directions[2]) directions[2] = this.#checkSide(x, y, x - offset, y);
        if (directions[3]) directions[3] = this.#checkSide(x, y, x + offset, y);

        render(this.#board);

        if (directions.includes(true)) {
            this.#spreadLight(x, y, ++offset, directions);
        }
    }

    #checkSide(centerX, centerY, x, y) {
        if (!this.#isOutOfBound(x, y) && !this.#isObstacle(x, y)) {
            if (this.#isBulb(x, y)) {
                if (this.#isBulb(centerX, centerY)) {
                    this.#board[y][x].overlappingBulbs++;
                    this.#board[centerY][centerX].overlappingBulbs++;
                } else {
                    this.#board[y][x].overlappingBulbs--;
                    this.#board[centerY][centerX].overlappingBulbs--;
                }
            }
            if (this.#isBulb(centerX, centerY)) {
                this.#board[y][x].lightSourceCount++;
            } else {
                this.#board[y][x].lightSourceCount--;
            }
            this.#paintCell(x, y);
            this.#paintCell(centerX, centerY);
            return true;
        } else {
            return false;
        }
    }

    #paintCell(x, y) {
        if (this.#board[y][x].overlappingBulbs === 0) {
            if (this.#board[y][x].lightSourceCount === 0) {
                this.#board[y][x].style = dark;
            } else {
                this.#board[y][x].style = bright;
            }
        } else {
            this.#board[y][x].style = crossingBulbs;
        }
    }

    #checkBulbAmountOfObstacles() {
        for (let y = 0; y < this.#board.length; y++) {
            for (let x = 0; x < this.#board[y].length; x++) {
                if (this.#board[y][x].style === obstacle || this.#board[y][x].style === obstacleWithCorrectAmountBulb) {
                    let numOfBulbs = 0;
                    if (!this.#isOutOfBound(x, y - 1)) numOfBulbs += this.#isBulb(x, y - 1);
                    if (!this.#isOutOfBound(x, y + 1)) numOfBulbs += this.#isBulb(x, y + 1);
                    if (!this.#isOutOfBound(x - 1, y)) numOfBulbs += this.#isBulb(x - 1, y);
                    if (!this.#isOutOfBound(x + 1, y)) numOfBulbs += this.#isBulb(x + 1, y);
                    if (this.#board[y][x].value === numOfBulbs) {
                        this.#board[y][x].style = obstacleWithCorrectAmountBulb;
                    } else {
                        this.#board[y][x].style = obstacle;
                    }
                }
            }
        }
        render(this.#board);
    }

    #isGameOver() {
        for (let y = 0; y < this.#board.length; y++) {
            for (let x = 0; x < this.#board[y].length; x++) {
                console.log(this.#board[y][x].style);
                if ((this.#board[y][x].style === obstacle && this.#board[y][x].value !== "") ||
                    (this.#board[y][x].style === dark || this.#board[y][x].style === crossingBulbs)) {
                    return false;
                }
            }
        }
        return true;
    }

    getBoard() {
        return this.#board;
    }

    isUpdating() {
        return this.#updating;
    }

    #isObstacle(x, y) {
        return this.#board[y][x].style === obstacle || this.#board[y][x].style === obstacleWithCorrectAmountBulb;
    }

    #isOutOfBound(x, y) {
        return y < 0 || y >= this.#board.length || x < 0 || x >= this.#board[y].length;
    }

    #isBulb(x, y) {
        return this.#board[y][x].value === bulb;
    }

    async #sleep(time) {
        return await new Promise(resolve => setTimeout(resolve, time));
    }
}
