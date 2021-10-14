// @ts-check

import { Engine } from './engine';
import { Entity } from './entity';

class Action {
  constructor() { }
  /**
   * @param {Engine} engine
   * @param {Entity} entity
   */
  perform(engine, entity) {
    throw 'Not implemented';
  }
}

class ActionWithDirection extends Action {
  /**
   * @param {number} dx
   * @param {number} dy
   */
  constructor(dx, dy) {
    super();
    this.dx = dx;
    this.dy = dy;
  }

  /**
   * @param {Engine} engine
   * @param {Entity} entity
   */
  perform(engine, entity) {
    throw 'Not implemented';
  }
}

class MeleeAction extends ActionWithDirection {
  /**
   * @param {number} dx
   * @param {number} dy
   */
  constructor(dx, dy) {
    super(dx, dy);
  }

  /**
   * @param {Engine} engine
   * @param {Entity} entity
   */
  perform(engine, entity) {
    let destX = entity.x + this.dx;
    let destY = entity.y + this.dy;

    let target = engine.map.getBlockingEntityAt(destX, destY);
    if (target !== undefined) {
      console.log(`You hit the ${target.name}`);
    }
  }
}

class MovementAction extends ActionWithDirection {
  /**
   * @param {number} dx
   * @param {number} dy
   */
  constructor(dx, dy) {
    super(dx, dy);
  }

  /**
   * @param {Engine} engine
   * @param {Entity} entity
   */
  perform(engine, entity) {
    let destX = entity.x + this.dx;
    let destY = entity.y + this.dy;

    if (!engine.map.inBounds(destX, destY)) {
      return;
    }

    if (engine.map.map[destX][destY].isWall()) {
      return;
    }

    if (engine.map.getBlockingEntityAt(destX, destY)) {
      return;
    }

    entity.move(this.dx, this.dy);
  }
}

export class BumpAction extends ActionWithDirection {
  /**
   * @param {number} dx
   * @param {number} dy
   */
  constructor(dx, dy) {
    super(dx, dy);
  }

  /**
   * @param {Engine} engine
   * @param {Entity} entity
   */
  perform(engine, entity) {
    let destX = entity.x + this.dx;
    let destY = entity.y + this.dy;
    if (engine.map.getBlockingEntityAt(destX, destY)) {
      return new MeleeAction(this.dx, this.dy).perform(engine, entity);
    } else {
      return new MovementAction(this.dx, this.dy).perform(engine, entity);
    }
  }
}
