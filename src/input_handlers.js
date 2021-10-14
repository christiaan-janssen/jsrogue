import { BumpAction } from './actions'

export class EventHandler {
    constructor() { }

    handleKeys(ev) {
        let key = ev.code;
        let action;

        if (key === 'ArrowRight') {
            action = new BumpAction(1, 0);
        }
        else if (key === 'ArrowLeft') {
            action = new BumpAction(-1, 0);
        }
        else if (key === 'ArrowUp') {
            action = new BumpAction(0, -1);
        }
        else if (key === 'ArrowDown') {
            action = new BumpAction(0, 1);
        }

        return action;
    }
}
