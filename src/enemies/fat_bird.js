const Vector = require('../vector');

// This is a useless enemy that does not move, be careful not to walk into it though!

const CONSTANTS = {
  WIDTH: 50,
  HEIGHT: 70,
  TILE_SIZE: 50,
  TICKS_PER_FRAME: 2,
  MAX_FRAME_COUNT: 15,
};

const SPRITE_POS = {
  idle1: [2, 5],
  idle2: [42, 4],
  idle3: [84, 3],
  idle4: [124, 3],
  idle5: [161, 7],
  idle6: [201, 8],
  idle7: [241, 8],
  idle8: [281, 7],
  hit1: [0, 10],
  hit2: [40, 10],
  hit3: [81, 8],
  hit4: [122, 6],
  hit5: [162, 5],
};

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

const Enemy = require('./enemy');

class FatBird extends Enemy {
  constructor(pos) {
    super(pos);
    this.idleSprites = new Image();
    this.hitSprites = new Image();
    this.idleSprites.src = '../assets/sprites/pixel/enemies/FatBird/Idle (40x48).png';
    this.hitSprites.src = '../assets/sprites/pixel/enemies/FatBird/Hit (40x48).png';

    this.life = 2;

    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;
  }

  static create(pos) {
    return new FatBird(pos);
  }

  get size() {
    // fat bird is one tile size!
    return new Vector(1, 1);
  }

  handleFrames() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameCount += 1;
      if (this.frameCount === this.maxFrameCount) {
        this.frameCount = 0;
        if (this.isHit) this.finishGettingHit();
      }
    }
  }

  // The fat bird is a useless enemy, so no movement needs to be handled!
  step() {
    this.handleFrames();
    // this.handleMovement();
  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;

    if (!this.isHit) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, SPRITE_POS['idle1'], SPRITE_SIZE['idle1'], this.idleSprites);
        case 1:
          return this.selectSprite(ctx, SPRITE_POS['idle1'], SPRITE_SIZE['idle1'], this.idleSprites);
        case 2:
          return this.selectSprite(ctx, SPRITE_POS['idle2'], SPRITE_SIZE['idle2'], this.idleSprites);
        case 3:
          return this.selectSprite(ctx, SPRITE_POS['idle2'], SPRITE_SIZE['idle2'], this.idleSprites);
        case 4:
          return this.selectSprite(ctx, SPRITE_POS['idle3'], SPRITE_SIZE['idle3'], this.idleSprites);
        case 5:
          return this.selectSprite(ctx, SPRITE_POS['idle3'], SPRITE_SIZE['idle3'], this.idleSprites);
        case 6:
          return this.selectSprite(ctx, SPRITE_POS['idle4'], SPRITE_SIZE['idle4'], this.idleSprites);
        case 7:
          return this.selectSprite(ctx, SPRITE_POS['idle4'], SPRITE_SIZE['idle4'], this.idleSprites);
        case 8:
          return this.selectSprite(ctx, SPRITE_POS['idle5'], SPRITE_SIZE['idle5'], this.idleSprites);
        case 9:
          return this.selectSprite(ctx, SPRITE_POS['idle5'], SPRITE_SIZE['idle5'], this.idleSprites);
        case 10:
          return this.selectSprite(ctx, SPRITE_POS['idle6'], SPRITE_SIZE['idle6'], this.idleSprites);
        case 11:
          return this.selectSprite(ctx, SPRITE_POS['idle6'], SPRITE_SIZE['idle6'], this.idleSprites);
        case 12:
          return this.selectSprite(ctx, SPRITE_POS['idle7'], SPRITE_SIZE['idle7'], this.idleSprites);
        case 13:
          return this.selectSprite(ctx, SPRITE_POS['idle7'], SPRITE_SIZE['idle7'], this.idleSprites);
        case 14:
          return this.selectSprite(ctx, SPRITE_POS['idle8'], SPRITE_SIZE['idle8'], this.idleSprites);
        case 15:
          return this.selectSprite(ctx, SPRITE_POS['idle8'], SPRITE_SIZE['idle8'], this.idleSprites);
      }
    } else {
      if ([0, 1, 10, 15].includes(this.frameCount)) {
        return this.selectSprite(ctx, SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.hitSprites);
      } else if ([2, 3, 11].includes(this.frameCount)) {
        return this.selectSprite(ctx, SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.hitSprites);
      } else if ([4, 5, 12].includes(this.frameCount)) {
        return this.selectSprite(ctx, SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.hitSprites);
      } else if ([6, 7, 13].includes(this.frameCount)) {
        return this.selectSprite(ctx, SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.hitSprites);
      } else if ([8, 9, 14].includes(this.frameCount)) {
        return this.selectSprite(ctx, SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.hitSprites);
      } 
    }
  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    // [35, 235] is taken as the default sprite size for fat bird (tis just an estimate...)
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 35;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 35;

    // const extraHeight = -3;

    const xOnScreen = 950 / 2 + 50 * (this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - this.viewPortCenter.y); // + extraHeight;

    ctx.drawImage(spritesImg,
      coordinates[0], coordinates[1],
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }
};

module.exports = FatBird;