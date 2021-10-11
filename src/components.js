// @ts-check

import { Path } from "rot-js"
import { GameMap } from './game_map'


export class Fighter {
    /**
     * @param {number} attack
     * @param {number} defence
     * @param {number} hp
     */
    constructor(attack, defence, hp) {
        this.attack = attack;
        this.defence = defence;
        this.hp = hp;
        this.maxHp = hp;
    }

    /**
     * Apply damage to this entity
     * @param {number} dmg
     */
    takeDmg(dmg) {
        this.hp -= dmg;
    }

    /**
     * Heal hitpoints of this entity
     * @param {number} amount
     */
    heal(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }
}

export class AI {
    /**
     * The basic ai class
     * @param {number} x
     * @param {number} y
     * @param {GameMap} map
     */
    constructor(x, y, map) {
        this.x = x;
        this.y = y
        this.map = map
        this.astar = new Path.AStar(this.x, this.y, (x, y) => { return !this.map[x][y].isWall ? true : false })
    }

    run() {
        // let dx = this.map.player.x;
        // let dy = this.map.player.y;
        this.astar.compute
    }
}
