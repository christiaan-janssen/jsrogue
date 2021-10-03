import { Engine } from './engine'


const GAME_WIDTH = 80;
const GAME_HEIGHT = 50;

let engine = new Engine(GAME_WIDTH, GAME_HEIGHT);

// Call render once to show something on the screen
engine.render();

window.addEventListener("keyup", (e) => engine.handleEvents(e));
document.body.appendChild(engine.display.getContainer());