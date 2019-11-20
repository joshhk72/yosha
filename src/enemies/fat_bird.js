const Vector = require('../vector');

const CONSTANTS = {
  WIDTH: 50,
  HEIGHT: 70,
  TILE_SIZE: 50,
  TICKS_PER_FRAME: 5,
  MAX_FRAME_COUNT: 7,
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
        this.isHit = false; // may put this in a delay later...
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
          return this.selectSprite(ctx, SPRITE_POS['idle2'], SPRITE_SIZE['idle2'], this.idleSprites);
        case 2:
          return this.selectSprite(ctx, SPRITE_POS['idle3'], SPRITE_SIZE['idle3'], this.idleSprites);
        case 3:
          return this.selectSprite(ctx, SPRITE_POS['idle4'], SPRITE_SIZE['idle4'], this.idleSprites);
        case 4:
          return this.selectSprite(ctx, SPRITE_POS['idle5'], SPRITE_SIZE['idle5'], this.idleSprites);
        case 5:
          return this.selectSprite(ctx, SPRITE_POS['idle6'], SPRITE_SIZE['idle6'], this.idleSprites);
        case 6:
          return this.selectSprite(ctx, SPRITE_POS['idle7'], SPRITE_SIZE['idle7'], this.idleSprites);
        case 7:
          return this.selectSprite(ctx, SPRITE_POS['idle8'], SPRITE_SIZE['idle8'], this.idleSprites);
      }
    } else {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.hitSprites);
        case 1 || 2:
          return this.selectSprite(ctx, SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.hitSprites);
        case 3:
          return this.selectSprite(ctx, SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.hitSprites);
        case 4:
          return this.selectSprite(ctx, SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.hitSprites);
        case 5 || 6 || 7:
          return this.selectSprite(ctx, SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.hitSprites);
      }
    }
  }


  selectSprite(ctx, coordinates, size, spritesImg) {
    // [35, 235] is taken as the default sprite size for fat bird (tis just an estimate...)
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 35;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 35;

    const extraHeight = -3;
    // Hopefully the extraHeight doesn't make hitboxes deceptive!
    const xOnScreen = 950 / 2 + 50 * (this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - this.viewPortCenter.y) + extraHeight;

    ctx.drawImage(spritesImg,
      coordinates[0], coordinates[1],
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }
};

module.exports = FatBird;