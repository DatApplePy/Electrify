import { tableElement } from "./references.js";

export function render(boardState) {
    // tableElement.innerHTML = "";
    // const tBody = document.createElement("tbody");
    // tableElement.appendChild(tBody);
    // boardState.map(row => tBody.appendChild(renderRow(row)))

    tableElement.innerHTML = boardState.map(row => renderRow(row)).join("\n");
}

function renderRow(row) {
    // const tRow = document.createElement("tr");
    // row.map(cell => tRow.appendChild(renderCell(cell)));
    // return tRow;

    return `<tr>${row.map(cell => renderCell(cell)).join("\n")}</tr>`
}

function renderCell(cell) {
    // const tCell = document.createElement("td");
    // tCell.classList.add(...cell.style);
    // tCell.innerHTML = cell.value;
    // return tCell;

    return `<td ${cell.style}>${cell.value}</td>`
}