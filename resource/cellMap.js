import {Cell} from "../js/cell.js";
import {black, bulb, white, yellow} from "../js/references.js";

export const cellMap = {
    "bl": [black, ""],
    "b0": [black, "0"],
    "b1": [black, "1"],
    "b2": [black, "2"],
    "b3": [black, "3"],
    "b4": [black, "4"],
    "wh": [white, ""],
    "yl": [yellow, bulb],

    extract(code) {
        return new Cell(cellMap[code][0], cellMap[code][1]);
    },

    compress(cell) {
        if (cell.color === white) return "wh";
        if (cell.color === yellow) return "yl";
        if (cell.color === black) return cell.value === "" ? "bl" : "b" + cell.value;
    }
}