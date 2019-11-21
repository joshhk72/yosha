const Vector = require('./vector.js');

class Door {
  constructor(pos) {
    this.pos = pos;
    this.levelComplete = false;
  }

  static create(pos) {
    return new Door(pos);
  }

  get size() {
    return new Vector(1, 1);
  }

  get type() {
    return "door";
  }

  open() {
    this.levelComplete = true;
  }

  step() {
    
  }

  draw() {

  }

  mute() { }

  unmute() { }
}

module.exports = Door;