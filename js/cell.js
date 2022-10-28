export class Cell {
    constructor(color, value) {
        this.color = color;
        this.value = value;
        this.lightSourceCount = 0;
    }
}