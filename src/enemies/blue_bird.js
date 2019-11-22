const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  idle1: [35, 39],
  idle2: [35, 42],
  idle3: [31, 45],
  idle4: [31, 45],
  idle5: [37, 35],
  idle6: [37, 32],
  idle7: [37, 32],
  idle8: [37, 35],
  hit1: [39, 31],
  hit2: [39, 31],
  hit3: [37, 34],
  hit4: [35, 37],
  hit5: [35, 39],
};

const BACK_SPRITE_POS = {
  lookUp: [525, 4],
  walk1: [142, 4],
  walk2: [125, 4],
  walk3: [108, 5],
  walk4: [91, 4],
  walk5: [74, 4],
  walk6: [57, 4],
  walk7: [40, 4],
  walk8: [22, 4],
  hit1: [50, 7],
  hit2: [68, 7],
  hit3: [88, 6],
  hit4: [106, 6],
  hit5: [128, 9],
  hit6: [147, 8],
  hit7: [169, 9],
  shoot1: [167, 5],
  shoot2: [187, 4],
  shoot3: [207, 4],
  shoot4: [229, 4],
  shoot5: [253, 4],
  shoot6: [277, 4],
  shoot7: [299, 6],
  shoot8: [318, 4],
  stand: [2, 4],
  jump1: [278, 3],
  jump2: [295, 3],
  fall: [9, 3]
};

const FRONT_SPRITE_POS = {
  lookUp: [15, 25],
  walk: [15, 25],
  stand: [15, 25],
  jump1: [17, 26],
  jump2: [19, 26],
  fall: [21, 26],
  hit1: [15, 25],
  hit2: [15, 25],
  hit3: [15, 25],
  hit4: [15, 25],
  hit5: [15, 23],
  hit6: [18, 25],
  hit7: [17, 24],
  shoot1: [17, 24],
  shoot2: [16, 25],
  shoot3: [19, 25],
  shoot4: [21, 25],
  shoot5: [21, 25],
  shoot6: [19, 25],
  shoot7: [15, 23],
  shoot8: [18, 25],
};

const CONSTANTS = {
  MAX_FRAME_COUNT: 9,
  TICKS_PER_FRAME: 4
};

class BlueBird extends Enemy {
  // Blue bird is constructed with a "<" or ">" depending on which direction it starts flying
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
    return new BlueBird(pos, char);
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

module.exports = BlueBird;