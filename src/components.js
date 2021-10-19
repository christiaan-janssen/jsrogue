// @ts-check

import { Entity } from './entity';
import { Engine } from './engine';
import { BumpAction } from './actions';


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
     * @param {Entity} entity
     */
    constructor(entity) {
        this.entity = entity;
        this.path = [];
    }

    /**
     * @param {Engine} engine
     * */
    run(engine) {
        this.path = engine.calculatePath(this.entity.x, this.entity.y);

        //for (let i = 0; i < this.path.length; i++) {
        //    console.log(`x: ${this.path[i][0]} - y: ${this.path[i][0]}`)
        //}

        let x = this.path[1][0] - this.entity.x;
        let y = this.path[1][1] - this.entity.y;

        //this.entity.move(x, y);
        let action = new BumpAction(x, y);
        if (action !== undefined)
            action.perform(engine, this.entity);

    }
}
