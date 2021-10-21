export class Inventory {
  constructor() {
    this.items = [];
  }

  addToInventory(item) {
    this.items.push(item);
  }

  removeFromInventory(item){
    // ??
  }

  createRowItem(item) {
    let span = document.createElement('span');
    span.appendChild(document.createTextNode(item.name));
    return span;
  }

  render() {
    let inv = document.getElementById('inventory');
    inv.innerHTML = "";
    let div = document.createElement("div");
    for (let i = 0; i < this.items.length; i++) {
      let line = this.createRowItem(this.items[0]);
      inv.appendChild(line);
      inv.appendChild(document.createElement("br"));
    }
  }
}
