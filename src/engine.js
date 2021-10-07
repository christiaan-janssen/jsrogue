import { Display } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';
import { GameMap } from './game_map';

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.map = new GameMap(80,40);
        this.gameLog = ["Welcome to jsRogue!"];

        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.player = new Entity(
            this.map.rooms[0]._x1+1,
            this.map.rooms[0]._y1+1,
            "@", "white", "Player"
        );
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);

        if (action.type === 'move') {
            let dx = this.player.x + action.dx;
            let dy = this.player.y + action.dy;
            let maybeEntity =  this.map.getBlockingEntityAt(dx, dy);
            if (maybeEntity !== undefined) {
                this.gameLog.push(`You hit the ${maybeEntity.name}`);
                console.log(this.gameLog);
            } else if (!this.map.map[dx][dy].isWall()) {
                this.player.move(action.dx, action.dy);
            }

        }
        this.render();
    }
    renderLog() {
        for (let i = 0; i < this.gameLog.length; i++) {
            this.display.drawText(20, 41+i, this.gameLog[i]);
        }
        if (this.gameLog.length > 7) {
            this.gameLog.shift();
        }
    }

    render() {
        this.display.clear();
        this.map.updateFov(this.player);
        for (let x = 0; x < this.map.width; x++) {
            for (let y = 0; y < this.map.height; y++) {
                if (this.map.map[x][y].explored) {
                    if (this.map.viewshed.includes(x+','+y)) {
                        if (this.map.map[x][y].blocked === false) {
                            this.display.draw(x, y, '.', 'white');
                        } else if (this.map.map[x][y].blocked === true) {
                            this.display.draw(x, y, '#', 'white');
                        }
                    } else {
                        if (!this.map.map[x][y].isWall()) {
                            this.display.draw(x, y, '.', 'gray');
                        } else if (this.map.map[x][y].isWall() ) {
                            this.display.draw(x, y, '#', 'gray');
                        }
                    }
                }
            }
        }
        for (let e = 0;e < this.map.entities.length;e++) {
            let x = this.map.entities[e].x;
            let y = this.map.entities[e].y;
            if (this.map.viewshed.includes(x+','+y))
            this.display.draw(x, y, this.map.entities[e].glyph, this.map.entities[e].color);
        }
        this.renderLog();
        this.display.draw(this.player.x, this.player.y, this.player.glyph, this.player.color);
    }
}
