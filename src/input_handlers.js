import { BumpAction } from './actions'

export class EventHandler {
    constructor() {
        this.inventoryVisible = false;
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

    handleKeys(ev, engine) {
        let key = ev.code;
        let action;

        if (this.keys.hasOwnProperty(key) && this.inventoryVisible === false) {
            let [x, y] = this.keys[key];
            action = new BumpAction(x, y);
        }

        if (key === 'KeyG') {
            let item = engine.map.getNonBlockingItem(engine.player.x, engine.player.y);
            if (item !== undefined) {
                engine.inventory.addToInventory(item);
                engine.gameLog.add(`You pick up the ${item.name}`);

                // Call render to update show the update log.
                // TODO: Move to the log class?
                engine.render();

                // Remove the item from the map
                let index = engine.map.entities.indexOf(item);
                engine.map.entities.splice(index, 1);
                engine.inventory.render();
            }
        }

        // Toggle Inventory
        if (key === 'KeyI') {
            let ui = document.getElementById('ui');
            if (ui.style.display === "none") {
                ui.style.display = "block";
                this.inventoryVisible = true;
            } else {
                ui.style.display = "none";
                this.inventoryVisible = false;
            }
        }

        return action;
    }
}
