import { Engine } from './engine'

window.onload = () => {
  const GAME_WIDTH = 80;
  const GAME_HEIGHT = 50;

  let engine = new Engine(GAME_WIDTH, GAME_HEIGHT);

  // Call render once to show something on the screen
  engine.init();
  window.addEventListener("keyup", (e) => engine.handleEvents(e));
  document.getElementById("canvas").appendChild(engine.display.getContainer());
}
