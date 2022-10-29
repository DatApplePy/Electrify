export class Cell {
    constructor(color, value) {
        this.style = color;
        this.value = value;
        this.lightSourceCount = 0;
        this.overlappingBulbs = 0;
    }
}