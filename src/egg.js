const Vector = require('./vector');

const CONSTANTS = {
  SPRITE_POS: [361, 226],
  SPRITE_SIZE: [12, 13],
  WIDTH: 25,
  HEIGHT: 25,
  GRAVITY: 0.29,
};

class Egg {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.sprites = new Image();
    this.sprites.src = '../assets/sprites/back-yoshi.png';
  }

  get type() {
    return "egg";
  }

  get size() {
    return new Vector(0.5, 0.5);
  }

  handleMovement(timeStep, state) {
    // movement for x-direction
    const xVel = this.vel.x;
    this.pos = this.pos.plus(new Vector(xVel * timeStep, 0));

    // movement for y-direction
    let yVel = this.vel.y + timeStep * CONSTANTS.GRAVITY;
    this.pos = this.pos.plus(new Vector(0, yVel * timeStep));

    // for eggs, xVel does not change
    this.vel.y = yVel;
  }

  step(timeStep, state) {
    this.handleMovement(timeStep);
  }

  draw(ctx, viewPortCenter) {
    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y);
    ctx.drawImage(this.sprites,
      CONSTANTS.SPRITE_POS[0], CONSTANTS.SPRITE_POS[1],
      CONSTANTS.SPRITE_SIZE[0], CONSTANTS.SPRITE_SIZE[1],
      xOnScreen, yOnScreen,
      CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
  }
}

module.exports = Egg;