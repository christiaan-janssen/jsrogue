import { Display, KEYS } from "rot-js";

const GAME_WIDTH = 50;
const GAME_HEIGHT = 30;

let playerX = 12;
let playerY = 10;

let display = new Display({ width: GAME_WIDTH, height: GAME_HEIGHT });

function drawGame() {
    display.clear();
    display.draw(playerX, playerY, "@", "white");
}

drawGame();

function handleKeys(e) {
    let key = e.code;
    if (key === 'ArrowRight') {
        playerX += 1;
    }
    else if (key === 'ArrowLeft') {
        playerX -= 1;
    }
    else if (key === 'ArrowUp') {
        playerY -= 1;
    }
    else if (key === 'ArrowDown') {
        playerY += 1;
    }
    drawGame();
}


window.addEventListener("keyup", (e) => handleKeys(e));
document.body.appendChild(display.getContainer());