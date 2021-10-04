import { Display, Map, FOV } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.mapWidth = 80;
        this.mapHeight = 40;
        this.map = new Array(40);

        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.mapData = this.createMap(this.mapWidth, this.mapHeight);
        this.player = new Entity(
            this.mapData._rooms[0]._x1,
            this.mapData._rooms[0]._y1, "@", "white"
        );
        this.fov;
        this.viewshed = [];
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);

        if (action.type === 'move') {
            if (this.map[this.player.x + action.dx][this.player.y + action.dy] === 0) {
                this.player.move(action.dx, action.dy);
            }
        }
        this.render();
    }


    createMap(w, h) {
        let mapData = new Map.Digger(w, h);
        for (let x = 0; x < w; x++) {
            this.map[x] = new Array(h)
        }
        mapData.create((x, y, val) => {
            this.map[x][y] = val;
        });
        this.fov = new FOV.PreciseShadowcasting((x,y) => {
            if (this.map[x][y] == 0) {
                return true;
            }
                return false;
            }
        );

        return mapData;
    }


    render() {
        this.viewshed = [];
        this.fov.compute(
            this.player.x, this.player.y, 10, (x,y,r,v) => {
                this.viewshed.push(x+','+y)
            }
        )

        this.display.clear();
        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                if (this.viewshed.includes(x+','+y)) {
                    if (this.map[x][y] === 0) {
                        this.display.draw(x, y, '.');
                    } else if (this.map[x][y] === 1) {
                        this.display.draw(x, y, '#');
                    }
                }
            }
        }

        this.display.draw(this.player.x, this.player.y, this.player.glyph, this.player.color);
    }
}
