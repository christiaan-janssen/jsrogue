import { Display } from "rot-js";

const GAME_WIDTH = 50;
const GAME_HEIGHT = 30;

var display = new Display({ width: GAME_WIDTH, height: GAME_HEIGHT });

display.draw(12, 10, "@", "white");

document.body.appendChild(display.getContainer());