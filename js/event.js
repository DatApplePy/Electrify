import {detailsDiv, gameDiv, menuDiv, playerNameInput} from "./references.js";
import {render} from "./renderer.js";
import {State} from "./state.js";

const state = new State();

export function loadLevel(event) {
    const name = playerNameInput.value;
    const level = event.target.level;
    state.loadLevel(name, level);
    switchPanel();
    render(state.getBoard());
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

        console.log(await state.update(x, y));
    }
}