import {bulb, black, red, white, yellow} from "./references.js";
import {cellMap} from "../resource/cellMap.js";
import {render} from "./renderer.js";

export const state = {
    name: null,
    board: null,

    loadLevel(name, level) {
        this.name = name;
        this.board = [];
        for (let y = 0; y < level.length; y++) {
            this.board[y] = [];
            for (let x = 0; x < level[y].length; x++) {
                this.board[y][x] = cellMap.extract(level[y][x]);
            }
        }
    },

    putBulb(x, y) {
        if (this.board[y][x].value === "") {
            this.board[y][x].value = bulb;
            this.board[y][x].lightSourceCount++;
        } else {
            this.board[y][x].value = "";
            this.board[y][x].lightSourceCount--;
        }
        this.paintCell(x, y)
    },

    async spreadLight(x, y, offset, directions = [true, true, true, true]) {
        if (directions[0]) directions[0] = this.checkSide(x, y, x, y - offset);
        if (directions[1]) directions[1] = this.checkSide(x, y, x, y + offset);
        if (directions[2]) directions[2] = this.checkSide(x, y, x - offset, y);
        if (directions[3]) directions[3] = this.checkSide(x, y, x + offset, y);

        render(this.board);
        await this.sleep(1000);

        if (directions.includes(true)) {
            await this.spreadLight(x, y, ++offset, directions);
        }
    },

    checkSide(centerX, centerY, x, y) {
        if (!this.isOutOfBound(x, y) && !this.isObstacle(x, y)) {
            if (this.isBulb(x, y)) {
                if (this.isBulb(centerX, centerY)) {
                    this.board[y][x].overlappingBulbs++;
                    this.board[centerY][centerX].overlappingBulbs++;
                } else {
                    this.board[y][x].overlappingBulbs--;
                    this.board[centerY][centerX].overlappingBulbs--;
                }
            }
            return true;
        } else {
            return false;
        }
    },

    paintCell(x, y) {
        if (this.board[y][x].overlappingBulbs === 0) {
            if (this.board[y][x].lightSourceCount === 0) {
                this.board[y][x].style = white;
            } else {
                this.board[y][x].style = yellow;
            }
        } else {
            this.board[y][x].style = red;
        }
    },

    isObstacle(x, y) {
        return this.board[y][x].style === black;
    },

    isOutOfBound(x, y) {
        return y < 0 || y >= this.board.length || x < 0 || x >= this.board[y].length;
    },

    isBulb(x, y) {
        return this.board[y][x].value === bulb;
    },

    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
};