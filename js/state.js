import { cellMap } from "../resource/cellMap.js";
import { obstacle, bulb, crossingBulbs, dark, bright, obstacleWithCorrectAmountBulb } from "./references.js";
import { render } from "./renderer.js";

export class State {
    #name;
    #board;
    #coordsOfObstacles;
    #updating;
    #finished;

    constructor(name = "", board = null, coordsOfObstacles = null) {
        this.#name = name;
        this.#board = board;
        this.#coordsOfObstacles = coordsOfObstacles;
        this.#updating = false;
        this.#finished = false;
    }

    toJSON() {
        return {
            name : this.#name,
            board : this.#board,
            coordsOfObstacles : this.#coordsOfObstacles
        };
    }

    static loadState(stateObject) {
        render(stateObject.board);
        return new State(stateObject.name, stateObject.board, stateObject.coordsOfObstacles);
    }

    loadLevel(name, level) {
        this.#name = name;
        this.#board = [];
        this.#coordsOfObstacles = [];
        for (let y = 0; y < level.length; y++) {
            this.#board[y] = [];
            for (let x = 0; x < level[y].length; x++) {
                this.#board[y][x] = cellMap.extract(level[y][x]);
                if (this.#isObstacle(x, y)) this.#coordsOfObstacles.push([x, y]);
            }
        }
        this.#checkBulbAmountOfObstacles();
        render(this.#board);
    }

    async update(x, y) {
        if (!this.#isObstacle(x, y)) {
            this.#updating = true
            this.#putBulb(x, y);
            this.#checkBulbAmountOfObstacles();
            await this.#spreadLight(x, y);
            this.#finished = this.#isGameOver();
            this.#updating = false;
        }
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
            await this.#spreadLight(x, y, ++offset, directions);
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
        this.#coordsOfObstacles.forEach(coords => {
            let numOfBulbs = 0;
            const x = coords[0];
            const y = coords[1];
            if (!this.#isOutOfBound(x, y - 1)) numOfBulbs += this.#isBulb(x, y - 1);
            if (!this.#isOutOfBound(x, y + 1)) numOfBulbs += this.#isBulb(x, y + 1);
            if (!this.#isOutOfBound(x - 1, y)) numOfBulbs += this.#isBulb(x - 1, y);
            if (!this.#isOutOfBound(x + 1, y)) numOfBulbs += this.#isBulb(x + 1, y);
            if (this.#board[y][x].value === numOfBulbs) {
                this.#board[y][x].style = obstacleWithCorrectAmountBulb;
            } else {
                this.#board[y][x].style = obstacle;
            }
        });

        render(this.#board);
    }

    #isGameOver() {
        this.#board.forEach(row => {
            row.forEach(cell => {
                if ((cell.style === obstacle && cell.value !== "") ||
                    (cell.style === dark || cell.style === crossingBulbs)) {
                    return false;
                }
            })
        });
        return true;
    }

    isUpdating() {
        return this.#updating;
    }

    #isObstacle(x, y) {
        return this.#board[y][x].style === obstacle ||
            this.#board[y][x].style === obstacleWithCorrectAmountBulb;
    }

    #isOutOfBound(x, y) {
        return y < 0 || y >= this.#board.length ||
            x < 0 || x >= this.#board[y].length;
    }

    #isBulb(x, y) {
        return this.#board[y][x].value === bulb;
    }

    async #sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
