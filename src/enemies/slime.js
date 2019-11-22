const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  walk1: [46, 25],
  walk2: [46, 25],
  walk3: [44, 23],
  walk4: [22, 23],
  walk5: [22, 23],
  walk6: [24, 24],
  walk7: [44, 23],
  walk8: [],
  walk9: [],
  walk10: [],
  hit1: [31, 21],
  hit2: [31, 21],
  hit3: [29, 23],
  hit4: [27, 25],
  hit5: [27, 27],
};

const BACK_SPRITE_POS = {
  walk1: [46, 25],
  walk2: [46, 25],
  walk3: [44, 23],
  walk4: [22, 23],
  walk5: [22, 23],
  walk6: [24, 24],
  walk7: [44, 23],
  walk8: [],
  walk9: [],
  walk10: [],
  hit1: [31, 21],
  hit2: [31, 21],
  hit3: [29, 23],
  hit4: [27, 25],
  hit5: [27, 27],
};

const FRONT_SPRITE_POS = {
  walk1: [46, 25],
  walk2: [46, 25],
  walk3: [44, 23],
  walk4: [22, 23],
  walk5: [22, 23],
  walk6: [24, 24],
  walk7: [44, 23],
  walk8: [],
  walk9: [],
  walk10: [],
  hit1: [31, 21],
  hit2: [31, 21],
  hit3: [29, 23],
  hit4: [27, 25],
  hit5: [27, 27],
};

const CONSTANTS = {
  TILE_SIZE: 50,
  MAX_FRAME_COUNT: 9,
  TICKS_PER_FRAME: 4,
  RELOAD_TIME: 250, // in milliseconds
  X_SPEED: 0.5,
};

class Slime extends Enemy {
  constructor(pos, char) {
    super(pos, char);
    this.frontWalkSprites = new Image();
    this.backWalkSprites = new Image();
    this.frontHitSprites = new Image();
    this.backHitSprites = new Image();
    this.frontFlySprites.src = './assets/sprites/pixel/enemies/Slime/front-walk.png';
    this.backFlySprites.src = './assets/sprites/pixel/enemies/Slime/back-walk.png';
    this.frontHitSprites.src = './assets/sprites/pixel/enemies/Slime/front-hit.png';
    this.backHitSprites.src = './assets/sprites/pixel/enemies/Slime/back-hit.png';
  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;

    if (!this.isHit && this.vel.x > 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk1'], SPRITE_SIZE['walk1'], this.frontWalkSprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk2'], SPRITE_SIZE['walk2'], this.frontWalkSprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk3'], SPRITE_SIZE['walk3'], this.frontWalkSprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk4'], SPRITE_SIZE['walk4'], this.frontWalkSprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk5'], SPRITE_SIZE['walk5'], this.frontWalkSprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk6'], SPRITE_SIZE['walk6'], this.frontWalkSprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk7'], SPRITE_SIZE['walk7'], this.frontWalkSprites);
        case 7:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk8'], SPRITE_SIZE['walk8'], this.frontWalkSprites);
        case 8:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk9'], SPRITE_SIZE['walk9'], this.frontWalkSprites);
        case 9:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk10'], SPRITE_SIZE['walk10'], this.frontWalkSprites);
      }
    } else if (!this.isHit && this.vel.x < 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk1'], this.backWalkSprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk2'], SPRITE_SIZE['walk2'], this.backWalkSprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk3'], SPRITE_SIZE['walk3'], this.backWalkSprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk4'], SPRITE_SIZE['walk4'], this.backWalkSprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk5'], SPRITE_SIZE['walk5'], this.backWalkSprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk6'], SPRITE_SIZE['walk6'], this.backWalkSprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk7'], SPRITE_SIZE['walk7'], this.backWalkSprites);
        case 7:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk8'], SPRITE_SIZE['walk8'], this.backWalkSprites);
        case 8:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk9'], SPRITE_SIZE['walk9'], this.backWalkSprites);
        case 9:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk10'], SPRITE_SIZE['walk10'], this.backWalkSprites);
      }
    } else if (this.isHit && this.vel.x < 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.backHitSprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.backHitSprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.backHitSprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.backHitSprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.backHitSprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.backHitSprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.backHitSprites);
        case 7:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.backHitSprites);
        case 8:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.backHitSprites);
        case 9:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.backHitSprites);
      }
    } else if (this.isHit && this.vel.x > 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.frontHitSprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.frontHitSprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.frontHitSprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.frontHitSprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.frontHitSprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.frontHitSprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.frontHitSprites);
        case 7:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.frontHitSprites);
        case 8:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.frontHitSprites);
        case 9:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.frontHitSprites);
      }
    }

  }
};

module.exports = Slime;