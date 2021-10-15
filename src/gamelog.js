//@ts-check
import {Display} from "rot-js";

export class GameLog {
  constructor() {
    this.log = [];
  }

  /**
   * Add a line to the log
   * @param {string} line
   */
  add(line) {
    this.log.push(line);
    if (this.log.length > 7) {
      this.log.shift();
    }
  }

  /**
   * Render the log to the display. It takes an x and y
   * coordinate and a Rot-js `Display`
   * @param {number} x
   * @param {number} y
   * @param {Display} display
   */

  render(x, y, display) {
    for (let i = 0; i < this.log.length; i++) {
      display.drawText(x, y + i, this.log[i]);
    }
  }
}
