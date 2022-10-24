import { normalBoardState } from "../resource/normallevel.js";
import { render } from "./renderer.js";

window.onload = render(normalBoardState);