import { Map, FOV } from "rot-js";
import { Fighter, AI } from "./components";
import { Entity } from './entity';

class Tile {
  constructor(type) {
    if (type === 'wall') {
      this.type = 'wall';
      this.blocked = true;
      this.blocksSight = true;
    } else if (type === 'floor') {
      this.type = 'floor';
      this.blocked = false;
      this.blocksSight = false;
    }
    this.type = type;
    this.explored = false;
  }

  isWall() {
    if (this.blocked === true) {
      return true;
    }
    return false;
  }
}

export class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = new Array(width);
    this.mapData = this.createMap(this.width, this.height);
    this.rooms = this.mapData.getRooms();
    this.entities = this.createMonsters(this.rooms);
    this.fov;
    this.viewshed = [];
  }

  inBounds(x, y) {
    if (this.tiles[x] !== undefined && this.tiles[x][y] !== undefined) {
      if (x > 0 && x < this.width && y > 0 && y < this.height) {
        return true
      }
    }
    return false;
  }


  createMap(w, h) {
    let mapData = new Map.Digger(w, h);
    for (let x = 0; x < w; x++) {
      this.tiles[x] = new Array(h)
    }
    mapData.create((x, y, tile) => {
      if (tile === 0) {
        this.tiles[x][y] = new Tile('floor');
      } else {
        this.tiles[x][y] = new Tile('wall');
      }
    });

    /*
     * Setup the FOV. The callback function looks at what parts of the map
     * block sight:
     * 1 = wall (true)
     * 0 = floor (false)
     */
    this.fov = new FOV.PreciseShadowcasting((x, y) => {
      if (this.tiles[x] !== undefined && this.tiles[x][y] !== undefined) {
        if (!this.tiles[x][y].isWall()) {
          return true;
        }
        return false;
      }
    });

    return mapData;
  }

  createMonsters(rooms) {
    let entities = [];
    for (let i = 1; i < rooms.length; i++) {
      let enemy = new Entity(rooms[i]._x1 + 1, rooms[i]._y1 + 1, 'o', 'green', 'Orc');
      enemy.components.fighter = new Fighter(1, 1, 5);
      enemy.components.AI = new AI(enemy, this);
      entities.push(enemy);
    }
    return entities;
  }

  getBlockingEntityAt(x, y) {
    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].x === x && this.entities[i].y === y
          && this.entities[i].blocking) {
        return this.entities[i];
      }
    }
  }

  /**
   * Update hte FOV based on the players location and radius.
   * @param {Entity} player
   */
  updateFov(player) {
    this.viewshed = [];
    this.fov.compute(
      player.x, player.y, 10, (x, y, r, v) => {
        if (this.inBounds(x, y)) {
          this.viewshed.push(x + ',' + y);

          this.tiles[x][y].explored = true;
        }
      });
  }

  render(display) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        // if (this.tiles[x][y].explored) {
          if (this.viewshed.includes(x + ',' + y)) {
            if (this.tiles[x][y].blocked === false) {
              display.draw(x, y, '.', 'white');
            } else if (this.tiles[x][y].blocked === true) {
              display.draw(x, y, '#', 'white');
            }
          } else {
            if (!this.tiles[x][y].isWall()) {
              display.draw(x, y, '.', 'gray');
            } else if (this.tiles[x][y].isWall()) {
              display.draw(x, y, '#', 'gray');
            }
          }
        // }
      }
    }
    for (let e = 0; e < this.entities.length; e++) {
      let x = this.entities[e].x;
      let y = this.entities[e].y;
      // if (this.viewshed.includes(x + ',' + y))
      display.draw(x, y, this.entities[e].glyph, this.entities[e].color);
    }
  }
}
