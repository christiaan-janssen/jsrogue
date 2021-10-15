import { Display, Scheduler } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';
import { GameMap } from './game_map';
import { Fighter } from './components';
import { GameLog } from './gamelog';

/**
 * Main game engine. Handles input / rendering / gameState
 * TODO: Fix low cohesion in this class
 * TODO: Look into scheduling: https://ondras.github.io/rot.js/manual/#timing
 * TODO: Add colors to the log
 */

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.map = new GameMap(80, 40);
        this.gameLog = new GameLog();
        this.scheduler = new Scheduler.Simple();
        this.player = this.createPlayer();
        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.playerMoved = false;

        this.gameLog.add("Welcome to jsRogue!");
    }
    createPlayer() {
        let player = new Entity(
            this.map.rooms[0]._x1 + 1,
            this.map.rooms[0]._y1 + 1,
            "@", "white", "Player"
        );
        player.components.fighter = new Fighter(3, 2, 15);
        return player;
    }

    run() {
        for (let i = 0; i < this.map.entities.length; i++) {
            this.map.entities[0].components.AI.run();
        }

        this.render();
        this.playerMoved = false;
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);
        if (action !== undefined)
            action.perform(this, this.player);

        this.run();
    }

    renderLog() {
        for (let i = 0; i < this.gameLog.length; i++) {
            this.display.drawText(20, 41 + i, this.gameLog[i]);
        }
    }

    renderUI() {
        this.display.drawText(2, 41, `HP: ${this.player.components.fighter.hp}/${this.player.components.fighter.maxHp}`)
    }

    render() {
        this.display.clear();
        this.map.updateFov(this.player);
        this.map.render(this.display);
        this.gameLog.render(20, 41, this.display);
        this.renderUI();
        this.display.draw(this.player.x, this.player.y, this.player.glyph, this.player.color);
    }
}
