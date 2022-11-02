import {
    detailsButton,
    loadEasyButton,
    loadHardButton,
    loadNormalButton,
    loadSavedGameButton,
    playAgainButton,
    tableElement
} from "./references.js";
import {
    continueButtonActivator,
    loadPrefabLevel, loadRecentGames,
    loadSavedGame,
    onCellClick, playAgain,
    saveGameOnWindowClose,
    showDetails
} from "./event.js";
import {easy, normal, hard} from "../resource/prefabLevels.js";

loadEasyButton.level = easy;
loadEasyButton.addEventListener("click", loadPrefabLevel);
loadNormalButton.level = normal;
loadNormalButton.addEventListener("click", loadPrefabLevel);
loadHardButton.level = hard;
loadHardButton.addEventListener("click", loadPrefabLevel);
loadSavedGameButton.addEventListener("click", loadSavedGame);
detailsButton.addEventListener("click", showDetails);
tableElement.addEventListener("click", onCellClick);
playAgainButton.addEventListener("click", playAgain);

window.onbeforeunload = saveGameOnWindowClose;
window.onload = () => {
    continueButtonActivator();
    loadRecentGames();
};