import {detailsDiv, gameDiv, menuDiv} from "./references.js";
import {easyBoardState} from "../resource/easylevel.js";
import {normalBoardState} from "../resource/normallevel.js";
import {hardBoardState} from "../resource/hardlevel.js";
import {state} from "./state.js";
import {render} from "./renderer.js";

export function loadEasyLevel() {
    state.loadLevel(easyBoardState);
    switchPanel();
    render(state.board);
}

export function loadNormalLevel() {
    state.loadLevel(normalBoardState);
    switchPanel();
    render(state.board);
}

export function loadHardLevel() {
    state.loadLevel(hardBoardState);
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
    if(!event.target.matches("td")) {
        return;
    }

    const cell = event.target;
    const x = cell.cellIndex;
    const y = cell.parentNode.rowIndex;

    if(!state.isObstacle(x, y)) {
        state.putBulb(x, y);
        render(state.board);
    }
}