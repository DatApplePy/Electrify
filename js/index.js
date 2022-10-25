import {detailsButton, loadEasyButton, loadHardButton, loadNormalButton, tableElement} from "./references.js";
import {loadEasyLevel, loadHardLevel, loadNormalLevel, onCellClick, showDetails} from "./event.js";

loadEasyButton.addEventListener("click", loadEasyLevel);
loadNormalButton.addEventListener("click", loadNormalLevel);
loadHardButton.addEventListener("click", loadHardLevel);
detailsButton.addEventListener("click", showDetails);
tableElement.addEventListener("click", onCellClick);