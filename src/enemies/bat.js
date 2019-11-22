const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  fly1: ['idk'],
  fly2: ['idk'],
  fly3: [44, 23],
  fly4: [22, 23],
  fly5: [22, 23],
  fly6: [24, 24],
  fly7: [44, 23],
  hit1: [31, 21],
  hit2: [31, 21],
  hit3: [29, 23],
  hit4: [27, 25],
  hit5: [27, 27],
};

const BACK_SPRITE_POS = {
  fly1: ['idk'],
  fly2: ['idk'],
  fly3: [93, 4],
  fly4: [150, 3],
  fly5: [196, 2],
  fly6: [241, 2],
  fly7: [277, 3],
  hit1: [7, 5],
  hit2: [53, 5],
  hit3: [100, 4],
  hit4: [147, 3],
  hit5: [193, 2],
};

const FRONT_SPRITE_POS = {
  fly1: ['idk'],
  fly2: ['idk'],
  fly3: [185, 4],
  fly4: [150, 3],
  fly5: [104, 2],
  fly6: [57, 2],
  fly7: [1, 3],
  hit1: [192, 5],
  hit2: [146, 5],
  hit3: [101, 4],
  hit4: [56, 3],
  hit5: [10, 2],
};

const CONSTANTS = {
  TILE_SIZE: 50,
  MAX_FRAME_COUNT: 9,
  TICKS_PER_FRAME: 4,
  RELOAD_TIME: 250, // in milliseconds
};

class Bat extends Enemy {
  // Bat is constructed with a "<" or ">" depending on which direction it starts flying
  constructor(pos, char) {
    super(pos, char);
    this.frontFlySprites = new Image();
    this.backFlySprites = new Image();
    this.frontHitSprites = new Image();
    this.backHitSprites = new Image();

    this.life = 1; // fragile dudes

    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;
  }

  static create(pos, char) {
    return new Bat(pos, char);
  }

  get size() {
    // fat bird is one tile size!
    return new Vector(1, 1);
  }

  draw(ctx, viewPortCenter) {

  }

  step() {
    this.handleFrames();
    this.handleMovement();
  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    // [25, 25] is taken as the default sprite size for fat bird (tis just an estimate...)
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 35;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 35;

    // const extraHeight = -3;

    const xOnScreen = 950 / 2 + 50 * (this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - this.viewPortCenter.y);

    ctx.drawImage(spritesImg,
      coordinates[0], coordinates[1],
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }
};

module.exports = Bat;