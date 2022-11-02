import {cellMap} from "./cellMap.js";
import {obstacle, obstacleWithCorrectAmountBulb} from "../references.js";

export class levelLoader {
    static constructLevel(prefabLevel) {
        const levelName = prefabLevel["name"];
        const stringBoard = prefabLevel["board"];
        const board = [];
        const coordsOfObstacles = [];
        for (let y = 0; y < stringBoard.length; y++) {
            board[y] = [];
            for (let x = 0; x < stringBoard[y].length; x++) {
                board[y][x] = cellMap.extract(stringBoard[y][x]);
                if (board[y][x].style === obstacle ||
                    board[y][x].style === obstacleWithCorrectAmountBulb) {
                    coordsOfObstacles.push([x, y]);
                }
            }
        }
        return [levelName, board, coordsOfObstacles];
    }
}