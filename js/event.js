import {detailsDiv, gameDiv, loadSavedGameButton, menuDiv, playAgainButton, playerNameInput} from "./references.js";
import { State } from "./state.js";
import {levelLoader} from "./util/prefabLevelLoader.js";
import {Timer} from "./util/Timer.js";
import {renderRecentGames} from "./renderer.js";

let state = null;

export function showDetails() {
    if (detailsDiv.style.maxHeight) {
        detailsDiv.style.maxHeight = null;
    } else {
        detailsDiv.style.maxHeight = detailsDiv.scrollHeight + "px";
    }
}

export function saveGameOnWindowClose() {
    if (state !== null) {
        const savedState = JSON.stringify(state);
        localStorage.setItem("savedGame", savedState);
    }
    return null;
}

export function continueButtonActivator() {
    loadSavedGameButton.disabled = localStorage.getItem("savedGame") === null;
}

export function loadRecentGames() {
    const recentGames = localStorage.getItem("recentGames");
    if (recentGames !== null) renderRecentGames(JSON.parse(recentGames));
}

export function loadPrefabLevel(event) {
    if ((name = playerNameInput.value) !== "") {
        const level = event.target.level;
        const newState = {
            name : name,
            level : levelLoader.constructLevel(level),
            timerObj : new Timer()
        };
        startGame(newState);
    }
    else {
        alert("Új játék kezdéséhez név megadása kötelező!");
    }
}

export function loadSavedGame() {
    const savedState = JSON.parse(localStorage.getItem("savedGame"));
    const parsedTimer = JSON.parse(savedState.timerObj);
    savedState.timerObj = Timer.loadTimer(parsedTimer);
    startGame(savedState)
}

function startGame(gameState = null) {
    state = State.loadState(gameState);
    switchPanel();
    state.startTimer();
}

function switchPanel() {
    menuDiv.style.display = "none";
    gameDiv.style.display = "flex";
}

export async function onCellClick(event) {
    const targetElement = event.target.closest("td");
    if (!this.contains(targetElement)) return;

    if (!state.isUpdating()) {
        const cell = targetElement;
        const x = cell.cellIndex;
        const y = cell.parentNode.rowIndex;

        await state.update(x, y);
        if (state.isGameOver()) {
            state.stopTimer();
            concatStats(state.getStats());
            switchPlayAgainButton();
        }
    }
}

export function playAgain() {
    state.reset();
    state.startTimer();
    switchPlayAgainButton();
}

function switchPlayAgainButton() {
    if (playAgainButton.style.display === "block") {
        playAgainButton.style.display = "none";
    } else {
        playAgainButton.style.display = "block";
    }

}

function concatStats(stats) {
    const record = [stats];
    if (localStorage.getItem("recentGames") === null) {
        localStorage.setItem("recentGames", JSON.stringify(record));
    } else {
        const recentGames = JSON.parse(localStorage.getItem("recentGames"));
        let newRecentGames = record.concat(recentGames);
        if (newRecentGames.length > 10) newRecentGames = newRecentGames.slice(0, 10);
        localStorage.setItem("recentGames", JSON.stringify(newRecentGames));
    }
}