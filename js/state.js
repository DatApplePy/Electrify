import {black, bulb, white, yellow} from "./references.js";

export const state = {
    board: null,
    loadLevel(level) {
        this.board = level;
    },
    isObstacle(x, y) {
        return this.board[y][x].color === black;
    },
    putBulb(x, y) {
        if(this.board[y][x].value === "") {
            this.board[y][x].value = bulb;
            this.board[y][x].color = yellow;
        } else {
            this.board[y][x].value = "";
            this.board[y][x].color = white;
        }
    }
};