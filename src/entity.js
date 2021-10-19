// @ts-check


/**
 * The base class for all game entities
 */
export class Entity {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} glyph
     * @param {string} color
     * @param {string} name
     */
    constructor(x, y, glyph, color, name) {
        this.x = x;
        this.y = y;
        this.glyph = glyph;
        this.color = color;
        this.name = name;
        this.blocking = true;
        this.components = new Object;
        this.effects = new Object;
    }

    /**
     * Move the entity
     * @param {number} dx
     * @param {number} dy
     */
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    /**
     * @param {import("./gamelog").GameLog} gamelog
     */
    die(gamelog) {
        gamelog.add(`%c{red}The ${this.name} dies!`);
        this.components.AI = undefined;
        this.glyph = '%';
        this.color = 'red';
        this.blocking = false;
        this.name = `the corps of a ${this.name}`;
    }
}
