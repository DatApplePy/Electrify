import {detailsButton, loadEasyButton, loadHardButton, loadNormalButton, tableElement} from "./references.js";
import {loadLevel, onCellClick, showDetails} from "./event.js";
import {easy, normal, hard} from "../resource/predefLevels.js";

loadEasyButton.level = easy;
loadEasyButton.addEventListener("click", loadLevel);
loadNormalButton.level = normal;
loadNormalButton.addEventListener("click", loadLevel);
loadHardButton.level = hard;
loadHardButton.addEventListener("click", loadLevel);
detailsButton.addEventListener("click", showDetails);
tableElement.addEventListener("click", onCellClick);