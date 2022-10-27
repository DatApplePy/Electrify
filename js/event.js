import {detailsDiv, gameDiv, menuDiv, playerNameInput} from "./references.js";
import {state} from "./state.js";
import {render} from "./renderer.js";

export function loadLevel(event) {
    const name = playerNameInput.value;
    const level = event.target.level;
    state.loadLevel(name, level);
    switchPanel();
    render(state.board);
}

function switchPanel() {
    menuDiv.style.display = "none";
    gameDiv.style.display = "flex";
}

export function showDetails() {
    if(detailsDiv.style.maxHeight) {
        detailsDiv.style.maxHeight = null;
    } else {
        detailsDiv.style.maxHeight = detailsDiv.scrollHeight + "px";
    }
}

export function onCellClick(event) {
    const targetElement = event.target.closest("td");
    if(!this.contains(targetElement)) return;

    const cell = targetElement;
    const x = cell.cellIndex;
    const y = cell.parentNode.rowIndex;

    if(!state.isObstacle(x, y)) {
        state.putBulb(x, y);
        state.checkAllSides(x, y, 1);
        // render(state.board);
    }
}