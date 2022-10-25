import { Cell } from "../js/cell.js";
import {black, white} from "../js/references.js";

export const normalBoardState = [
    [
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(black, "0"),
        new Cell(white, ""),
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(white, ""),
    ],
    [
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
    ],
    [
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(black, "3"),
        new Cell(white, ""),
        new Cell(black, ""),
    ],
    [
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(black, "1"),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
    ],
    [
        new Cell(black, "2"),
        new Cell(white, ""),
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(black, ""),
    ],
    [
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(white, ""),
    ],
    [
        new Cell(white, ""),
        new Cell(white, ""),
        new Cell(black, ""),
        new Cell(white, ""),
        new Cell(black, "2"),
        new Cell(white, ""),
        new Cell(white, ""),
    ]
]