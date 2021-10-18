import { Display, Scheduler, Path } from "rot-js";
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

    init() {
        this.render();
    }

    run() {
        this.handleEnemyTurns();
        this.render();
        this.playerMoved = false;
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);
        if (action !== undefined)
            action.perform(this, this.player);

        this.run();
    }

    handleEnemyTurns() {
        for (let e = 0; e < this.map.entities.length; e++) {
            this.map.entities[e].components.AI.run(this);
        }
    }

    renderUI() {
        this.display.drawText(2, 41, `HP: ${this.player.components.fighter.hp}/${this.player.components.fighter.maxHp}`)
    }

    /**
     * @param {number} x1
     * @param {number} y1
     * @returns {number[]}
     * */
    calculatePath(x1,y1) {
        let path = [];
        let astar = new Path.AStar(this.player.x, this.player.y, (x, y) => {
            if (this.map.inBounds(x,y)) {
                if (this.map.tiles[x][y].type === 'floor') {
                    return true;
                }
            }
        });
        let pathCallBack = function(x,y) {
            path.push([x,y]);
        }
        astar.compute(x1, y1, pathCallBack);

        return path;
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
