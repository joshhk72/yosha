const Vector = require('../vector');
const Enemy = require('./enemy');

const SPRITE_SIZE = {
  fly1: [46, 25], // this is a guess
  fly2: [46, 25], // this is a guess
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
  fly1: [0, 3], // this is a guess
  fly2: [46, 3], // this is a guess
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
  fly1: [276, 3],
  fly2: [230, 3],
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
  MAX_FRAME_COUNT: 6,
  TICKS_PER_FRAME: 3,
  RELOAD_TIME: 250, // in milliseconds
  X_SPEED: 0.5,
};

class Bat extends Enemy {
  // Bat is constructed with a "<" or ">" depending on which direction it starts flying
  constructor(pos, char) {
    super(pos, char);
    this.frontFlySprites = new Image();
    this.backFlySprites = new Image();
    this.frontHitSprites = new Image();
    this.backHitSprites = new Image();
    this.frontFlySprites.src = './assets/sprites/pixel/enemies/Bat/front-fly.png';
    this.backFlySprites.src = './assets/sprites/pixel/enemies/Bat/back-fly.png';
    this.frontHitSprites.src = './assets/sprites/pixel/enemies/Bat/front-hit.png';
    this.backHitSprites.src = './assets/sprites/pixel/enemies/Bat/back-hit.png';

    this.char = char;

    this.life = 1; // fragile dudes
    this.vel = new Vector(0, 0); // until in viewport, no speed!
    this.startedMoving = false; // doesn't move until in viewport!

    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;
  }

  static create(pos, char) {
    return new Bat(pos, char);
  }

  get size() {
    // bats are smaller targets!
    return new Vector(0.75, 0.75);
  }

  step(timeStep, state) {
    if (!this.reloading) this.shoot(state);
    this.handleTurn(state);
    this.handleFrames();
    this.handleMovement(timeStep);
  }

  handleFrames() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameCount += 1;
      if (this.frameCount > this.maxFrameCount) {
        this.frameCount = 0;
        if (this.isHit) this.finishGettingHit();
      }
    }
  }

  handleMovement(timeStep) {
    const xVel = this.vel.x;
    const xMoveTo = this.pos.plus(new Vector(xVel * timeStep, 0));
    this.pos = xMoveTo;
  }

  handleTurn(state) {
    if (!this.startedMoving) return;
    if ((state.player.pos.x - this.pos.x > 7 && this.vel.x < 0) 
      || (state.player.pos.x - this.pos.x < -7 && this.vel.x > 0)) {
      this.vel = new Vector(-this.vel.x, 0);
      this.tickCount = 0;
      this.frameCount = 0;
    }
  }

  startMoving() {
    if (this.startedMoving) return;
    this.startedMoving = true;
    if (this.char === "<") {
      this.vel = new Vector(-CONSTANTS.X_SPEED, 0);
    } else if (this.char === ">") {
      this.vel = new Vector(CONSTANTS.X_SPEED, 0);
    }
  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;

    if (!this.isHit && this.vel.x > 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly1'], SPRITE_SIZE['fly1'], this.frontFlySprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly2'], SPRITE_SIZE['fly2'], this.frontFlySprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly3'], SPRITE_SIZE['fly3'], this.frontFlySprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly4'], SPRITE_SIZE['fly4'], this.frontFlySprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly5'], SPRITE_SIZE['fly5'], this.frontFlySprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly6'], SPRITE_SIZE['fly6'], this.frontFlySprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['fly7'], SPRITE_SIZE['fly7'], this.frontFlySprites);
      }
    } else if (!this.isHit && this.vel.x < 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly1'], SPRITE_SIZE['fly1'], this.backFlySprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly2'], SPRITE_SIZE['fly2'], this.backFlySprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly3'], SPRITE_SIZE['fly3'], this.backFlySprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly4'], SPRITE_SIZE['fly4'], this.backFlySprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly5'], SPRITE_SIZE['fly5'], this.backFlySprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly6'], SPRITE_SIZE['fly6'], this.backFlySprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['fly7'], SPRITE_SIZE['fly7'], this.backFlySprites);
      }
    } else if (this.isHit && this.vel.x < 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.backHitSprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.backHitSprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.backHitSprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.backHitSprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.backHitSprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.backHitSprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.backHitSprites);
      }
    } else if (this.isHit && this.vel.x > 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.frontHitSprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.frontHitSprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.frontHitSprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.frontHitSprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.frontHitSprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.frontHitSprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.frontHitSprites);
      }
    }

  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    // [25, 25] is taken as the default sprite size for fat bird (tis just an estimate...)
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 25;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 25;

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