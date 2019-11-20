const Vector = require('./vector');

// each tile on the map is going to be 50 x 50
// this makes the player size 1 x 1.4 tiles
const CONSTANTS = {
  WIDTH: 50,
  HEIGHT: 70,
  TILE_SIZE: 50,
  TICKS_PER_FRAME: 6,
  GRAVITY: 0.29,
  X_SPEED: 0.4,
  JUMP_SPEED: 1.1,
  STARTING_VEL: new Vector(0, 0),
  // STARTING_POS: new Vector(430, 380),
  MAX_FRAME_COUNT: 7,
};

const FRONT_SPRITE_POS = {
  walk1: [699, 4],
  walk2: [681, 4],
  walk3: [664, 4],
  walk4: [647, 4],
  walk5: [630, 4],
  walk6: [613, 5],
  walk7: [596, 4],
  walk8: [579, 4],
  stand: [719, 4],
  jump1: [278, 3],
  jump2: [295, 3],
  fall: [9, 3]
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
  throw1: [167, 5],
  throw2: [187, 4],
  throw3: [207, 4],
  throw4: [229, 4],
  throw5: [253, 4],
  throw6: [277, 4],
  throw7: [299, 6],
  throw8: [318, 4],
  stand: [2, 4],
  jump1: [278, 3],
  jump2: [295, 3],
  fall: [9, 3]
};

const SPRITE_SIZE = {
  lookUp: [15, 25],
  walk: [15, 25],
  stand: [15, 25],
  jump1: [17, 26],
  jump2: [19, 26],
  fall: [21, 26],
  throw1: [17, 24],
  throw2: [16, 25],
  throw3: [19, 25],
  throw4: [21, 25],
  throw5: [21, 25],
  throw6: [19, 25],
  throw7: [15, 23],
  throw8: [18, 25],
};


class Player {
  constructor(pos) {
    // this.pos = CONSTANTS.STARTING_POS;
    this.pos = pos.minus(new Vector(0, 0.333));
    this.vel = CONSTANTS.STARTING_VEL;
    this.frontSprites = new Image();
    this.backSprites = new Image();
    this.frontSprites.src = '../assets/sprites/yoshi.png';
    this.backSprites.src = '../assets/sprites/back-yoshi.png';
    
    this.facingFront = true; // facing front at the start
    this.movingTo = 0;
    this.wasMoving = 0;
    this.verticalPerspective = 0;
    this.jumping = false;
    
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
    this.frameCount = 0;
    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;
    this.tickCount = 0;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;

    this.handleFrames = this.handleFrames.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
  }

  static create(pos) {
    return new Player(pos);
  }

  get type() {
    return "player";
  }

  get size() {
    return new Vector(0.8, 1.333);
  }

  // moveTo determines x-direction movement
  moveTo(num) {
    this.movingTo = num;
    switch (num) {
      case 1:
        this.vel.x = CONSTANTS.X_SPEED;
        break;
      case -1:
        this.vel.x = -CONSTANTS.X_SPEED;
        break;
      case 0:
        this.vel.x = 0;
        break;
    }
  }

  lookVertically(num) {
    this.verticalPerspective = num;
  }

  jump() {
    if (!this.jumping) {
      this.vel.y = -CONSTANTS.JUMP_SPEED;
      this.jumping = true;
    }
  }

  shootEgg() {

  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;
    if (this.verticalPerspective > 0 && this.vel.x === 0) {
      this.selectSprite(ctx, BACK_SPRITE_POS['lookUp'], SPRITE_SIZE['lookUp'], this.backSprites);
    } else if (this.movingTo === 0) {
      return this.facingFront ? this.selectSprite(ctx, FRONT_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.frontSprites)
        : this.selectSprite(ctx, BACK_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.backSprites);
    } else if (this.movingTo > 0) {
      switch(this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.frontSprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.frontSprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.frontSprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.frontSprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.frontSprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.frontSprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.frontSprites);
        case 7:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.frontSprites);
      }
    } else if (this.movingTo < 0) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.backSprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.backSprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.backSprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.backSprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.backSprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.backSprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.backSprites);
        case 7:
          return this.selectSprite(ctx, BACK_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.backSprites);
        }
    }
  }

  handleFrames() {
    // Increment ticks if continuously moving
    if (this.movingTo !== 0) {
      if (this.wasMoving === this.movingTo) {
        this.tickCount += 1;
      } else {
        this.tickCount = 0;
        this.frameCount = 0;
      }
    } else { // just in case ticks & frames are used for something else than walking!
      this.tickCount = 0;
      this.frameCount = 0;
    }

    // Increment frames if enough ticks are reached on the same action
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      this.frameCount += 1;
      if (this.frameCount === this.maxFrameCount) this.frameCount = 0;
    }

    // If the player isn't standing still, then update 'front' status
    if (this.movingTo !== 0) this.facingFront = this.movingTo > 0;

    // Update this for checks done during the next step
    this.wasMoving = this.movingTo;
  }

  handleMovement(timeStep, state) {
    const xVel = this.vel.x;
    const xMoveTo = this.pos.plus(new Vector(xVel * timeStep, 0));
    if (!state.level.touches(xMoveTo, this.size, "wall") && !state.level.touches(xMoveTo, this.size, "tile") ) {
      this.pos = xMoveTo;
    }

    let yVel = this.vel.y + timeStep * CONSTANTS.GRAVITY;
    const yMoveTo = this.pos.plus(new Vector(0, yVel * timeStep));
    if (!state.level.touches(yMoveTo, this.size, "wall") && !state.level.touches(yMoveTo, this.size, "tile")) {
      // jumping or falling
      this.pos = yMoveTo;
    } else if (yMoveTo.y > this.pos.y) {
      // player is on the ground
      yVel = 0;
      this.jumping = false;
    }

    this.vel = new Vector(xVel, yVel);
  }

  step(timeStep, state) {
    this.handleFrames();
    this.handleMovement(timeStep, state);
  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    const width = CONSTANTS.TILE_SIZE * this.size.x;
    const height = CONSTANTS.TILE_SIZE * this.size.y;

    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // s is source, d is destination
    const extraHeight = 3; // Otherwise Yoshi looks like he's floating!!!
    const xOnScreen = 950/2 + 50*(this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450/2 + 50*(this.pos.y - this.viewPortCenter.y) + extraHeight;

    ctx.drawImage(spritesImg, 
      coordinates[0], coordinates[1], 
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }

  collided(hitbox) {
  }

  isHit(projectile) {
  }
}

module.exports = Player;