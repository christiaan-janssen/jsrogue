// @ts-check


/**
 * The base class for all game entitys
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
}
