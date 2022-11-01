import {detailsButton, loadEasyButton, loadHardButton, loadNormalButton, loadSavedGameButton, tableElement} from "./references.js";
import {continueButtonActivator, loadPredefLevel, loadSavedGame, onCellClick, saveGameOnWindowClose, showDetails} from "./event.js";
import {easy, normal, hard} from "../resource/predefLevels.js";

loadEasyButton.level = easy;
loadEasyButton.addEventListener("click", loadPredefLevel);
loadNormalButton.level = normal;
loadNormalButton.addEventListener("click", loadPredefLevel);
loadHardButton.level = hard;
loadHardButton.addEventListener("click", loadPredefLevel);
loadSavedGameButton.addEventListener("click", loadSavedGame);
detailsButton.addEventListener("click", showDetails);
tableElement.addEventListener("click", onCellClick);

window.onbeforeunload = saveGameOnWindowClose;
window.onload = continueButtonActivator;