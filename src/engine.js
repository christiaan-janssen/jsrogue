import { Display, Scheduler, Path } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';
import { GameMap } from './game_map';
import { Fighter } from './components';
import { GameLog } from './gamelog';
import { Inventory } from './inventory';

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
        this.gameLog = new GameLog();
        this.scheduler = new Scheduler.Simple();
        this.player = this.createPlayer();
        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.playerMoved = false;
        this.inventory = new Inventory();

        this.gameLog.add("Welcome to jsRogue!");
    }

    createPlayer() {
        let player = new Entity(
            this.map.rooms[0]._x1 + 1,
            this.map.rooms[0]._y1 + 1,
            "@", "white", "Player"
        );
        player.components.fighter = new Fighter(3, 2, 15);
        this.map.entities.push(player)
        return player;
    }

    init() {
        this.render();
    }

    run() {
        if (this.playerMoved) {
            this.handleEnemyTurns();
            this.render();
            this.playerMoved = false;
        }
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e, this);
        if (action !== undefined) {
            action.perform(this, this.player);
            this.playerMoved = true;
            let item = this.map.getNonBlockingItem(this.player.x, this.player.y);
            if (item !== undefined) {
                this.gameLog.add(`You see ${item.name} here`)
            }
        }

        this.run();
    }

    handleEnemyTurns() {
        for (let e = 0; e < this.map.entities.length; e++) {
            let entity = this.map.entities[e];
            if (entity.components.AI !== undefined &&
                this.map.viewshed.includes(entity.x + ',' + entity.y)) {
                this.map.entities[e].components.AI.run(this);
            }
        }
    }

    renderInventory() {
    }

    renderUI() {
        this.display.drawText(
            2, 41,
            `HP: ${this.player.components.fighter.hp}/${this.player.components.fighter.maxHp}`
        )
        this.inventory.render();
    }

    /**
     * @param {number} x1
     * @param {number} y1
     * @returns {number[]}
     * */
    calculatePath(x1, y1) {
        let path = [];
        let astar = new Path.AStar(this.player.x, this.player.y, (x, y) => {
            if (this.map.inBounds(x, y)) {
                if (this.map.tiles[x][y].type === 'floor') {
                    return true;
                }
            }
        });
        let pathCallBack = function(x, y) {
            path.push([x, y]);
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
        this.renderInventory();
    }
}
