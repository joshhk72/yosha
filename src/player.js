const Vector = require('./vector');

// each tile on the map is going to be 50 x 50
// this makes the player size 1 x 1.4 tiles
const CONSTANTS = {
  WIDTH: 50,
  HEIGHT: 70,
  TICKS_PER_FRAME: 6,
  GRAVITY: 0.3,
  X_SPEED: 0.4,
  JUMP_SPEED: 1.0,
  STARTING_VEL: new Vector(0, 0),
  // STARTING_POS: new Vector(430, 380),
  MAX_FRAME_COUNT: 7,
};

const FRONT_SPRITE_POS = {
  walk1: [718, 3],
  walk2: [698, 3],
  walk3: [680, 3],
  walk4: [663, 3],
  walk5: [646, 3],
  walk6: [629, 3],
  walk7: [612, 3],
  walk8: [595, 3],
  stand: [578, 3],
  jump1: [278, 3],
  jump2: [295, 3],
  fall: [9, 3]
};

const BACK_SPRITE_POS = {
  walk1: [141, 3],
  walk2: [124, 3],
  walk3: [107, 3],
  walk4: [90, 3],
  walk5: [73, 3],
  walk6: [56, 3],
  walk7: [39, 3],
  walk8: [21, 3],
  stand: [1, 3],
  jump1: [278, 3],
  jump2: [295, 3],
  fall: [9, 3]
};

const SPRITE_SIZE = {
  walk: [17, 26],
  stand: [17, 26],
  jump1: [17, 26],
  jump2: [19, 26],
  fall: [21, 26]
};


class Player {
  constructor(pos) {
    // this.pos = CONSTANTS.STARTING_POS;
    this.pos = pos.minus(new Vector(0, 0.41));
    this.vel = CONSTANTS.STARTING_VEL;
    this.width = CONSTANTS.WIDTH;
    this.height = CONSTANTS.HEIGHT;
    this.frontSprites = new Image();
    this.backSprites = new Image();
    this.frontSprites.src = '../assets/sprites/yoshi.png';
    this.backSprites.src = '../assets/sprites/back-yoshi.png';
    
    this.facingFront = true; // facing front at the start
    this.wasMoving = 0;
    this.movingTo = 0;
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
    return new Vector(1, 1.4);
  }

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

  jump() {
    console.log('jump');
    console.log(this.vel);
    if (!this.jumping) {
      this.vel.y = -CONSTANTS.JUMP_SPEED;
      this.jumping = true;
    }
  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;

    if (this.movingTo === 0) {
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
    if (this.wasMoving === this.movingTo) {
      this.tickCount += 1;
    } else {
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
      this.pos = yMoveTo;
    } else if (yMoveTo.y > this.pos.y) {
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
    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // s is source, d is destination
    const extraHeight = 3; // Otherwise Yoshi looks like he's floating!!!
    const xOnScreen = 950/2 + 50*(this.pos.x - this.viewPortCenter.x);
    const yOnScreen = 450/2 + 50*(this.pos.y - this.viewPortCenter.y) + extraHeight;

    ctx.drawImage(spritesImg, 
      coordinates[0], coordinates[1], 
      size[0], size[1],
      xOnScreen, yOnScreen,
      this.width, this.height);
  }

  collided(hitbox) {
  }

  isHit(projectile) {
  }
}

module.exports = Player;