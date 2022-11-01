import { detailsDiv, gameDiv, loadSavedGameButton, menuDiv, playerNameInput } from "./references.js";
import { render } from "./renderer.js";
import { State } from "./state.js";

let state = null;

export function loadPredefLevel(event) {
    state = new State();
    const name = playerNameInput.value;
    const level = event.target.level;
    state.loadLevel(name, level);
    switchPanel();
}

export function loadSavedGame() {
    const parsedState = JSON.parse(localStorage.getItem("savedGame"));
    state = State.loadState(parsedState);
    switchPanel();
}

export function saveGameOnWindowClose() {
    if (state !== null) {
        const stringifiedState = JSON.stringify(state);
        localStorage.setItem("savedGame", stringifiedState);
    }
    return null;
}

export function continueButtonActivator() {
    if (localStorage.getItem("savedGame") === null) {
        loadSavedGameButton.disabled = true;
    } else {
        loadSavedGameButton.disabled = false;
    }
}

function switchPanel() {
    menuDiv.style.display = "none";
    gameDiv.style.display = "flex";
}

export function showDetails() {
    if (detailsDiv.style.maxHeight) {
        detailsDiv.style.maxHeight = null;
    } else {
        detailsDiv.style.maxHeight = detailsDiv.scrollHeight + "px";
    }
}

export async function onCellClick(event) {
    const targetElement = event.target.closest("td");
    if (!this.contains(targetElement)) return;

    if (!state.isUpdating()) {
        const cell = targetElement;
        const x = cell.cellIndex;
        const y = cell.parentNode.rowIndex;

        await state.update(x, y);
    }
}