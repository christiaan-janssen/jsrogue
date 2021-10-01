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
     */
    constructor(x, y, glyph, color) {
        this.x = x;
        this.y = y;
        this.glyph = glyph;
        this.color = color;
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
