import { Display, Scheduler } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';
import { GameMap } from './game_map';
import { Fighter } from './components';

/**
 * Main game engine. Handles input / rendering / gameState
 * TODO: Fix low cohesion in this class
 * TODO: Look into scheduling: https://ondras.github.io/rot.js/manual/#timing
 */

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.map = new GameMap(80, 40);
        this.gameLog = ["Welcome to jsRogue!"];
        this.scheduler = new Scheduler.Simple();

        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.playerMoved = false;
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

        if (action.type === 'move') {
            let dx = this.map.player.x + action.dx;
            let dy = this.map.player.y + action.dy;
            let maybeEntity = this.map.getBlockingEntityAt(dx, dy);
            if (maybeEntity !== undefined && maybeEntity.blocking) {
                let dmg = this.map.player.components.fighter.attack - maybeEntity.components.fighter.defence;
                maybeEntity.components.fighter.takeDmg(dmg);
                if (maybeEntity.components.fighter.hp <= 0) {
                    this.gameLog.push(`You kill the ${maybeEntity.name}!`);
                    maybeEntity.glyph = '%';
                    maybeEntity.color = 'red';
                    maybeEntity.blocking = false;
                } else {
                    this.gameLog.push(`You hit the ${maybeEntity.name} for ${dmg} damage`);
                }
            } else if (!this.map.map[dx][dy].isWall()) {
                this.map.player.move(action.dx, action.dy);
            }
            this.playerMoved = true;
        }

        if(this.playerMoved) {
            this.run();
        }
    }

    renderLog() {
        for (let i = 0; i < this.gameLog.length; i++) {
            this.display.drawText(20, 41 + i, this.gameLog[i]);
        }
        if (this.gameLog.length > 7) {
            this.gameLog.shift();
        }
    }

    renderUI() {
        this.display.drawText(2, 41, `HP: ${this.map.player.components.fighter.hp}/${this.map.player.components.fighter.maxHp}`)
    }

    render() {
        this.display.clear();
        this.map.updateFov(this.map.player);
        this.map.render(this.display);
        this.renderLog();
        this.renderUI();
        this.display.draw(this.map.player.x, this.map.player.y, this.map.player.glyph, this.map.player.color);
    }
}
