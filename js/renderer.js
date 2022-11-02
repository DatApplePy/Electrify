import {playerNameParagraph, recentGamesDiv, tableElement, timerParagraph} from "./references.js";

export function render(boardState) {
    tableElement.innerHTML = boardState.map(row => renderRow(row)).join("\n");
}

function renderRow(row) {
    return `<tr>${row.map(cell => renderCell(cell)).join("\n")}</tr>`
}

function renderCell(cell) {
    return `<td ${cell.style}>${cell.value}</td>`
}

export function renderTimer(timer) {
    const time = timer.getTime();
    let m = time[2] < 10 ? "0" + time[2] : time[2];
    let s = time[1] < 10 ? "0" + time[1] : time[1];
    let ms = time[0] < 10 ? "00" + time[0] : time[0] < 100 ? "0" + time[0] : time[0];
    timerParagraph.innerHTML = `${m} : ${s} : ${ms}`;
}

export function renderName(name) {
    playerNameParagraph.innerHTML = `${name}`;
}

export function renderRecentGames(recentGamesArray) {
    recentGamesDiv.innerHTML = `<ul>${recentGamesArray.map(row => renderRecentGamesRow(row)).join("\n")}</ul>`
}

function renderRecentGamesRow(row) {
    let m = row[2][2] < 10 ? "0" + row[2][2] : row[2][2];
    let s = row[2][1] < 10 ? "0" + row[2][1] : row[2][1];
    let ms = row[2][0] < 10 ? "00" + row[2][0] : row[2][0] < 100 ? "0" + row[2][0] : row[2][0];

    return `<li>${row[0]} | ${row[1]} | ${m} : ${s} : ${ms}</li>`
}