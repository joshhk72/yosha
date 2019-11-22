const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  walk1: [38, 26],
  walk2: [40, 25],
  walk3: [42, 23],
  walk4: [42, 23],
  walk5: [40, 24],
  walk6: [38, 26],
  walk7: [36, 28],
  walk8: [34, 30],
  walk9: [34, 30],
  walk10: [36, 28],
  hit1: [44, 19],
  hit2: [44, 19],
  hit3: [42, 22],
  hit4: [40, 24],
  hit5: [38, 26],
};

const BACK_SPRITE_POS = {
  walk1: [3, 4],
  walk2: [46, 5],
  walk3: [89, 7],
  walk4: [133, 7],
  walk5: [178, 6],
  walk6: [223, 4],
  walk7: [268, 2],
  walk8: [313, 0],
  walk9: [357, 0],
  walk10: [400, 2],
  hit1: [0, 11],
  hit2: [44, 11],
  hit3: [89, 8],
  hit4: [134, 6],
  hit5: [179, 4],
};

const FRONT_SPRITE_POS = {
  walk1: [399, 4],
  walk2: [354, 5],
  walk3: [309, 7],
  walk4: [265, 7],
  walk5: [222, 6],
  walk6: [179, 4],
  walk7: [136, 2],
  walk8: [93, 0],
  walk9: [49, 0],
  walk10: [4, 2],
  hit1: [176, 11],
  hit2: [132, 11],
  hit3: [89, 8],
  hit4: [46, 6],
  hit5: [3, 4],
};

const CONSTANTS = {
  TILE_SIZE: 50,
  MAX_FRAME_COUNT: 9,
  TICKS_PER_FRAME: 4,
  RELOAD_TIME: 250, // in milliseconds
  X_SPEED: 0.3,
  GRAVITY: 0.29,
  FRAMES_BEFORE_TURNING: 20
};

class Slime extends Enemy {
  constructor(pos, char) {
    super(pos, char);
    this.pos = pos.plus(new Vector(0, 0.375));
    this.frontWalkSprites = new Image();
    this.backWalkSprites = new Image();
    this.frontHitSprites = new Image();
    this.backHitSprites = new Image();
    this.frontWalkSprites.src = './assets/sprites/pixel/enemies/Slime/front-walk.png';
    this.backWalkSprites.src = './assets/sprites/pixel/enemies/Slime/back-walk.png';
    this.frontHitSprites.src = './assets/sprites/pixel/enemies/Slime/front-hit.png';
    this.backHitSprites.src = './assets/sprites/pixel/enemies/Slime/back-hit.png';
    this.vel = new Vector(-CONSTANTS.X_SPEED, 0);
    this.life = 2;
  }

  static create(pos, char) {
    return new Slime(pos, char);
  }

  get size() {
    return new Vector(1, 0.625);
  }

  startMoving() {
    if (this.isMoving) return;
    this.isMoving = true;
    this.vel = new Vector(-CONSTANTS.X_SPEED, 0);
  }

  step(timeStep, state) {
    //if (!this.reloading) this.shoot(state, 0, 0.04);
    this.handleTurn(timeStep, state);
    this.handleFrames();
    this.handleMovement(timeStep);
  }

  handleFrames() {
    this.tickCount += 1;

    if (this.tickCount > CONSTANTS.TICKS_PER_FRAME) {
      this.tickCount = 0;
      this.frameCount += 1;
      if (this.frameCount > CONSTANTS.MAX_FRAME_COUNT) {
        this.frameCount = 0;
        if (this.isHit) this.finishGettingHit();
      }
    }
  }

  handleMovement(timeStep) {
    if (this.isMoving) {
      const xVel = this.vel.x;
      const xMoveTo = this.pos.plus(new Vector(xVel * timeStep, 0));
      this.pos = xMoveTo;
    }
  }

  // slimes turn on edges
  handleTurn(timeStep, state) {
    if (!this.isMoving) return;

    const xVel = this.vel.x;
    const xMoveTo = this.pos.plus(new Vector(xVel * timeStep * CONSTANTS.FRAMES_BEFORE_TURNING, 0));
    const willTouchGround = state.level.touches(xMoveTo.plus(new Vector(0, 1/50)), this.size, "tile");

    if (state.level.touches(xMoveTo, this.size, "wall") 
      || state.level.touches(xMoveTo, this.size, "tile")
      || !willTouchGround) {
      this.vel.x = -this.vel.x;
      this.tickCount = 0;
      this.frameCount = 0;
    }
  }

  startMoving() {
    if (this.isMoving) return;
    this.isMoving = true;
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

  selectSprite(ctx, coordinates, size, spritesImg) {
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 40;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 25;

    const extraHeight = 3;
    const xOnScreen = 950 / 2 + 50 * (this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - this.viewPortCenter.y) + (25-size[1] + 5);

    ctx.drawImage(spritesImg,
      coordinates[0], coordinates[1],
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }
};

module.exports = Slime;