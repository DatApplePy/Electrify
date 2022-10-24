import { tableElement } from "./references.js";

export function render(boardState) {
    tableElement.innerHTML = boardState.map(row => renderRow(row)).join("\n");
}

function renderRow(row) {
    return `<tr>${row.map(cell => renderCell(cell)).join("\n")}</tr>`
}

function renderCell(cell) {
    return `<td style="background-color: ${cell.color}">${cell.value}</td>`
}