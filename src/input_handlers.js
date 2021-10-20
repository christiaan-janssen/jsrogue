import { BumpAction } from './actions'

export class EventHandler {
    constructor() {
        this.keys = {
            'ArrowRight': [1, 0],
            'Numpad6': [1, 0],
            'KeyL': [1, 0],

            'ArrowLeft': [-1, 0],
            'Numpad4': [-1, 0],
            'KeyH': [-1, 0],

            'ArrowUp': [0, -1],
            'Numpad8': [0, -1],
            'KeyK': [0, -1],

            'ArrowDown': [0, 1],
            'Numpad2': [0, 1],
            'KeyJ': [0, 1],

            'Numpad7': [-1, -1],
            'KeyY': [-1, -1],

            'Numpad9': [1, -1],
            'KeyU': [1, -1],

            'Numpad3': [1, 1],
            'KeyN': [1, 1],

            'Numpad1': [-1, 1],
            'KeyB': [-1, 1],
        }
    }

    handleKeys(ev) {
        let key = ev.code;
        let action;

        if (this.keys.hasOwnProperty(key)) {
            let [x, y] = this.keys[key];
            action = new BumpAction(x, y);
        }

        return action;
    }
}
