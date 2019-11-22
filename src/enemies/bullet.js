const Vector = require('../vector');

const CONSTANTS = {
  SPRITE_POS: [4, 4],
  SPRITE_SIZE: [8, 8],
  WIDTH: 10,
  HEIGHT: 10,
  SPEED: 0.3,
};


class Bullet {
  constructor(pos, vel) {
    this.sprites = new Image();
    this.sprites.src = './assets/sprites/pixel/bullet.png';

    this.pos = pos;
    this.vel = vel;
  }

  get type() {
    return "bullet";
  }

  get size() {
    return new Vector(0.2, 0.2);
  }

  handleMovement(timeStep) {
    // movement for x-direction
    const xMove = this.vel.x * timeStep;
    let yMove = this.vel.y * timeStep;
    this.pos = this.pos.plus(new Vector(xMove, yMove));

    // velocity is constant for bullets, so no worries
  }

  step(timeStep) {
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

  // bullets might talk one day, but this is needed because mute is handled per 'actor'
  mute() {}
  unmute() {}
}

module.exports = Bullet;