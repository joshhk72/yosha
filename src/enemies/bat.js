const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  fly1: [30, 23],
  fly2: [35, 42],
  fly3: ['idk'],
  fly4: ['idk'],
  fly5: ['idk'],
  fly6: [29, 26],
  fly7: [27, 26],
  fly8: [27, 26],
  fly9: [27, 26],
  hit1: [39, 31],
  hit2: [39, 31],
  hit3: [37, 34],
  hit4: [35, 37],
  hit5: [35, 39],
};

const BACK_SPRITE_POS = {
  fly1: [1, 5],
  fly2: [35, 42],
  fly3: ['idk'],
  fly4: ['idk'],
  fly5: ['idk'],
  fly6: [29, 26],
  fly7: [27, 26],
  fly8: [27, 26],
  fly9: [27, 26],
  hit1: [39, 31],
  hit2: [39, 31],
  hit3: [37, 34],
  hit4: [35, 37],
  hit5: [35, 39],
};

const FRONT_SPRITE_POS = {
  fly1: [30, 23],
  fly2: [35, 42],
  fly3: ['idk'],
  fly4: ['idk'],
  fly5: ['idk'],
  fly6: [29, 26],
  fly7: [27, 26],
  fly8: [27, 26],
  fly9: [27, 26],
  hit1: [39, 31],
  hit2: [39, 31],
  hit3: [37, 34],
  hit4: [35, 37],
  hit5: [35, 39],
};

const CONSTANTS = {
  MAX_FRAME_COUNT: 9,
  TICKS_PER_FRAME: 4
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

  step() {
    this.handleFrames();
    this.handleMovement();
  }
};

module.exports = Bat;