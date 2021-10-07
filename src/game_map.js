import { Map, FOV  } from "rot-js";
import { Entity  } from './entity';

class Tile {
  constructor(type) {
    if (type === 'wall') {
        this.blocked = true;
        this.blocksSight = true;
    } else if (type === 'floor') {
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
    this.map = new Array(width);
    this.mapData = this.createMap(this.width, this.height);
    this.rooms = this.mapData.getRooms();
    this.entities = this.createMonsters(this.rooms);
    this.fov;
    this.viewshed = [];
  }

  createMap(w, h) {
    let mapData = new Map.Digger(w, h);
    for (let x = 0; x < w; x++) {
      this.map[x] = new Array(h)
    }
    mapData.create((x, y, tile) => {
      if (tile === 0) {
        this.map[x][y] = new Tile('floor');
      } else {
        this.map[x][y] = new Tile('wall');
      }
    });

    /*
     * Setup the FOV. The callback function looks at what parts of the map
     * block sight:
     * 1 = wall (true)
     * 0 = floor (false)
     */
    this.fov = new FOV.PreciseShadowcasting((x,y) => {
      if (this.map[x] !== undefined && this.map[x][y] !== undefined)
        if (!this.map[x][y].isWall()) {
            return true;
        }
            return false;
        }
    );

    return mapData;
  }

  createMonsters(rooms) {
    let entities = [];
    for (let i = 1; i < rooms.length; i++) {
      let enemy = new Entity(rooms[i]._x1+1, rooms[i]._y1+1, 'o', 'green', 'Orc')
      entities.push(enemy);
    }
    return entities;
  }

  getBlockingEntityAt(x,y) {
    for (let i=0;i<this.entities.length;i++) {
      if (this.entities[i].x === x && this.entities[i].y === y) {
        return this.entities[i];
      }
    }
  }

  /*
   * Update hte FOV based on the players location and radius.
   */
  updateFov(player) {
    this.viewshed = [];
    this.fov.compute(
      player.x, player.y, 10, (x,y,r,v) => {
        this.viewshed.push(x+','+y);

        this.map[x][y].explored = true;
    });
  }
}
