import { bulb, black, red, white, yellow } from "./references.js";
import { cellMap } from "../resource/cellMap.js";
import { render } from "./renderer.js";

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

    spreadLight(x, y, offset, directions = [true, true, true, true]) {
        if (directions[0]) directions[0] = this.checkSide(x, y, x, y - offset);
        if (directions[1]) directions[1] = this.checkSide(x, y, x, y + offset);
        if (directions[2]) directions[2] = this.checkSide(x, y, x - offset, y);
        if (directions[3]) directions[3] = this.checkSide(x, y, x + offset, y);

        if (directions.includes(true)) {
            this.spreadLight(x, y, ++offset, directions);
        }
    },

    checkSide(centerX, centerY, x, y) {
        if (!this.isOutOfBound(x, y) && !this.isObstacle(x, y)) {
            if (this.isBulb(centerX, centerY)) {
                this.board[y][x].lightSourceCount++;
                if (this.isBulb(x, y)) {
                    this.paintCell(x, y, red);
                    this.paintCell(centerX, centerY, red);
                } else {
                    this.paintCell(x, y);
                    this.paintCell(centerX, centerY);
                }
            } else {
                this.board[y][x].lightSourceCount--;
                this.paintCell(x, y);
            }
            return true;
        } else {
            return false;
        }
    },

    paintCell(x, y, customColor = yellow) {
        if (this.board[y][x].lightSourceCount === 0) {
            this.board[y][x].color = white;
        } else {
            this.board[y][x].color = customColor;
        }
    },

    isObstacle(x, y) {
        return this.board[y][x].color === black;
    },

    isOutOfBound(x, y) {
        return y < 0 || y >= this.board.length || x < 0 || x >= this.board[y].length;
    },

    isBulb(x, y) {
        return this.board[y][x].value === bulb;
    }
};