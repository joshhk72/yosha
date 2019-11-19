const Vector = require('./vector.js');

class Door {
  constructor(pos) {
    this.pos = pos;
  }

  static create(pos) {
    return new Door(pos);
  }

  get size() {
    return new Vector(1, 1);
  }

  draw() {

  }
}

module.exports = Door;