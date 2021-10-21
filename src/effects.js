class Effect {
    apply() {
        throw "Not implemented yet."
    }
}


export class Heal extends Effect {
    constructor(amount) {
        super();
        this.amount = amount;
    }

    apply(engine, entity) {
        entity.components.fighter.heal(this.amount);
        engine.gameLog.add(`The ${entity.name} heals for ${this.amount}`);
        engine.render();
    }
}
