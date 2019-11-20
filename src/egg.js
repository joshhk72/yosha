const Vector = require('./vector');

const CONSTANTS = {
  SPRITE_POS: [361, 226],
  SPRITE_SIZE: [12, 13],
  WIDTH: 50,
  HEIGHT: 70,
  GRAVITY: 0.29,
};

class Egg {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.size = new Vector(0.5, 0.5);
  }

  step() {

  }
  
  draw() {

  }
}

module.exports = Egg;