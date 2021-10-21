export class Inventory {
    constructor() {
        this.items = [];
        this.letters = "abcdefghjklmnopqrstuvwxyz".split('');
    }

    addToInventory(item) {
        item.letter = this.letters[this.items.length];
        this.items.push(item);
    }

    removeFromInventory(item) {
        console.lgo(item);
    }

    createRowItem(item, letter) {
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(`${letter} - ${item.name}`));
        span.classList = ['item'];
        return span;
    }

    render() {
        let inv = document.getElementById('inventory');
        inv.innerHTML = "";
        for (let i = 0; i < this.items.length; i++) {
            let line = this.createRowItem(this.items[i], this.items[i].letter);
            inv.appendChild(line);
            inv.appendChild(document.createElement("br"));
        }
    }

    handleClick() {
        console.log('Clicked!');
    }
}
