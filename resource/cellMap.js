import {Cell} from "../js/cell.js";
import {obstacle, dark} from "../js/references.js";

export const cellMap = {
    "bl": [obstacle, ""],
    "b0": [obstacle, 0],
    "b1": [obstacle, 1],
    "b2": [obstacle, 2],
    "b3": [obstacle, 3],
    "b4": [obstacle, 4],
    "wh": [dark, ""],

    extract(code) {
        return new Cell(cellMap[code][0], cellMap[code][1]);
    },

    compress(cell) {
        if (cell.style === dark) return "wh";
        if (cell.style === obstacle) return cell.value === "" ? "bl" : "b" + cell.value;
    }
}