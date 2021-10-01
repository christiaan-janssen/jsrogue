import { Display } from "rot-js";
import { EventHandler } from './input_handlers';
import { Entity } from './entity';

export class Engine {
    constructor(width, height) {
        this.width = width;
        this.height = height
        this.display = new Display({ width: this.width, height: this.height });
        this.eventHandler = new EventHandler();
        this.player = new Entity(10, 10, "@", "white");
    }

    handleEvents(e) {
        let action = this.eventHandler.handleKeys(e);

        if (action.type === 'move') {
            this.player.move(action.dx, action.dy);
        }
        this.render();

    }

    render() {
        this.display.clear();
        this.display.draw(this.player.x, this.player.y, this.player.glyph, this.player.co)
    }
}
