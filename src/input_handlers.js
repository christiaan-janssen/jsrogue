
export class EventHandler {
    constructor() { }

    handleKeys(ev) {
        let key = ev.code;
        let action = {};

        if (key === 'ArrowRight') {
            action.type = 'move';
            action.dx = 1
            action.dy = 0
        }
        else if (key === 'ArrowLeft') {
            action.type = 'move';
            action.dx = -1
            action.dy = 0
        }
        else if (key === 'ArrowUp') {
            action.type = 'move';
            action.dx = 0
            action.dy = -1
        }
        else if (key === 'ArrowDown') {
            action.type = 'move';
            action.dx = 0
            action.dy = 1
        }

        return action
    }
}
