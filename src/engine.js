import { Display, Map, FOV } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';
import { GameMap } from './game_map';

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.map = new GameMap(80,40);

        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.player = new Entity(
            this.map.rooms[0]._x1+1,
            this.map.rooms[0]._y1+1,
            "@", "white"
        );
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);

        if (action.type === 'move') {
            if (!this.map.map[this.player.x + action.dx][this.player.y + action.dy].isWall()) {
                this.player.move(action.dx, action.dy);
            }
        }
        this.render();
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
        this.display.draw(this.player.x, this.player.y, this.player.glyph, this.player.color);
    }
}
