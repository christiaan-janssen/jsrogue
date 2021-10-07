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

    takeDmg(dmg) {
        this.hp -= dmg;
    }

    heal(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }
}