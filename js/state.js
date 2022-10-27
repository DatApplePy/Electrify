import {black, bulb, red, white, yellow} from "./references.js";
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

    isObstacle(x, y) {
        return this.board[y][x].color === black;
    },

    isOutOfBound(x, y) {
        console.log(x, y);
        return y < 0 || y >= this.board.length || x < 0 || x >= this.board[y].length;
    },

    isBulb(x, y) {
        return this.board[y][x].value === bulb;
    },

    putBulb(x, y) {
        console.log(x, y);
        if (this.board[y][x].value === "") {
            this.board[y][x].value = bulb;
            this.board[y][x].color = yellow;
        } else {
            this.board[y][x].value = "";
            this.board[y][x].color = white;
        }
    },

    checkSide(x, y) {
        if (!this.isOutOfBound(x, y) && !this.isObstacle(x, y)) {
            this.board[y][x].color = yellow;
            return true;
        } else {
            return false;
        }
    },

    checkAllSides(x, y, offset, directions = [true, true, true, true]) {
        if (directions[0]) directions[0] = this.checkSide(x, y - offset);
        if (directions[1]) directions[1] = this.checkSide(x, y + offset);
        if (directions[2]) directions[2] = this.checkSide(x - offset, y);
        if (directions[3]) directions[3] = this.checkSide(x + offset, y);

        render(this.board);

        if (directions.includes(true)) {
            this.checkAllSides(x, y, ++offset, directions);
        }
    }
};