const Vector = require('./vector');
const Egg = require('./egg');

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
  RELOAD_TIME: 250, // in milliseconds
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
  hit1: [135, 8],
  hit2: [117, 8],
  hit3: [97, 7],
  hit4: [79, 7],
  hit5: [57, 10],
  hit6: [35, 9],
  hit7: [14, 10],
  shoot1: [552, 5],
  shoot2: [533, 4],
  shoot3: [510, 4],
  shoot4: [486, 4],
  shoot5: [462, 4],
  shoot6: [440, 4],
  shoot7: [422, 6],
  shoot8: [400, 4],
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

const SPRITE_SIZE = {
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


class Player {
  constructor(pos) {
    this.pos = pos.minus(new Vector(0, 0.333)); // offset needed because character is taller than single tile
    this.vel = CONSTANTS.STARTING_VEL;

    // images here
    this.frontSprites = new Image();
    this.backSprites = new Image();
    this.frontHitSprites = new Image();
    this.backHitSprites = new Image();
    this.frontSprites.src = './assets/sprites/yoshi.png';
    this.backSprites.src = './assets/sprites/back-yoshi.png';
    this.frontHitSprites.src = './assets/sprites/front-hit-yoshi.png';
    this.backHitSprites.src = './assets/sprites/back-hit-yoshi.png';

    //sounds here
    this.jumpSound = new Audio('./assets/audio/jump.wav');
    this.hurtSound = new Audio('./assets/audio/hurt.wav');
    this.shootSound = new Audio('./assets/audio/shoot.wav');
    this.jumpSound.volume = 0.3;
    this.hurtSound.volume = 0.3;
    this.shootSound.volume = 0.3;
    
    // facing front at the start
    this.facingFront = true;
    this.movingTo = 0;
    this.wasMoving = 0;
    this.verticalPerspective = 0;
    this.jumping = false;
    this.onGround = false;

    this.reloading = false; // this is for 'throttling' shooting of eggs
    this.shooting = false;
    this.shootingUp = false; // these two are differentiated so that animations can be differentiated
    this.muted = false;
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
    this.frameCount = 0;
    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;
    this.tickCount = 0;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;

    this.handleFrames = this.handleFrames.bind(this);
    this.handleMovement = this.handleMovement.bind(this);
    this.checkDoor = this.checkDoor.bind(this);
  }

  static create(pos) {
    return new Player(pos);
  }

  mute() {
    this.muted = true;
  }

  unmute() {
    this.muted = false;
  }

  get type() {
    return "player";
  }

  get size() {
    return new Vector(0.8, 1.333);
  }

  checkDoor(state) {
    if (state.door.levelComplete && state.level.overlap(state.player, state.door)) {
      state.level.win();
    }
  }

  // moveTo determines x-direction movement
  moveTo(num) {
    if (!this.isHit) { // if hit, you don't control your own velocity (for a bit);
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
  }

  lookVertically(num) {
    this.verticalPerspective = num;
  }

  jump() {
    if (!this.isHit && !this.jumping && this.onGround) {
      this.vel.y = -CONSTANTS.JUMP_SPEED;
      this.jumping = true;
      if (!this.muted) this.jumpSound.play();
    }
  }

  getHit(vel, state) {
    this.tickCount = 0;
    this.frameCount = 0;
    this.isHit = true;
    this.vel = vel;
    state.life.lose();
    if (!this.muted) this.hurtSound.play();
    setTimeout(() => {
      // Movement must continue after use is hit (bit of a hacky fix, but...)
      if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {
        this.vel = new Vector(0, this.vel.y);
      } else if (key.isPressed('left')) {
        this.vel = new Vector(-CONSTANTS.X_SPEED, this.vel.y);
      } else if (key.isPressed('right')) {
        this.vel = new Vector(CONSTANTS.X_SPEED, this.vel.y);
      }
      // this.vel = new Vector(0, this.vel.y);
      this.isHit = false;
      
    }, 800); // can either do it here or elsewhere;
  }

  recoil(vel) {
    this.vel = vel;
  }

  shoot(state) {
    if (!this.reloading && !this.shooting && !this.shootingUp) {
      this.tickCount = 0;
      this.frameCount = 0;
      this.shooting = true;
      this.reloading = true;
      let newEgg;
      if (this.facingFront) {
        newEgg = new Egg(this.pos, new Vector(0.7 + this.vel.x / 2, -1));
      } else {
        newEgg = new Egg(this.pos, new Vector(-0.7 + this.vel.x / 2, -1));
      }
      state.actors.push(newEgg);
      if (!this.muted) this.shootSound.play();
    }
  }

  shootUp(state) {
    if (!this.reloading && !this.shooting && !this.shootingUp) {
      this.tickCount = 0;
      this.frameCount = 0;
      this.shootingUp = true;
      this.reloading = true;
      // shooting straight up
      const newEgg = new Egg(this.pos, new Vector(0, -1.8));
      state.actors.push(newEgg);
      if (!this.muted) this.shootSound.play();
    }
  }

  draw(ctx, viewPortCenter) {
    this.viewPortCenter = viewPortCenter;

    if (this.isHit && this.facingFront) {
      if ([0].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.frontHitSprites);
      } else if ([1].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.frontHitSprites);
      } else if ([2].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.frontHitSprites);
      } else if ([3].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.frontHitSprites);
      } else if ([4].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit6'], SPRITE_SIZE['hit6'], this.frontHitSprites);
      } else if ([5].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit7'], SPRITE_SIZE['hit7'], this.frontHitSprites);
      } else if ([6, 7].includes(this.frameCount)) {
        return this.selectSprite(ctx, FRONT_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.frontHitSprites);
      } 
    } else if (this.isHit && !this.facingFront) {
      if ([0].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.backHitSprites);
      } else if ([1].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.backHitSprites);
      } else if ([2].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.backHitSprites);
      } else if ([3].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.backHitSprites);
      } else if ([4].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.backHitSprites);
      } else if ([5].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit6'], SPRITE_SIZE['hit6'], this.backHitSprites);
      } else if ([6, 7].includes(this.frameCount)) {
        return this.selectSprite(ctx, BACK_SPRITE_POS['hit7'], SPRITE_SIZE['hit7'], this.backHitSprites);
      } 
    }

    if (this.shooting && this.facingFront) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot1'], SPRITE_SIZE['shoot1'], this.frontSprites);
        case 1:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot2'], SPRITE_SIZE['shoot2'], this.frontSprites);
        case 2:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot3'], SPRITE_SIZE['shoot3'], this.frontSprites);
        case 3:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot4'], SPRITE_SIZE['shoot4'], this.frontSprites);
        case 4:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot5'], SPRITE_SIZE['shoot5'], this.frontSprites);
        case 5:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot6'], SPRITE_SIZE['shoot6'], this.frontSprites);
        case 6:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot7'], SPRITE_SIZE['shoot7'], this.frontSprites);
        case 7:
          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot8'], SPRITE_SIZE['shoot8'], this.frontSprites);
      }
    } else if (this.shooting && !this.facingFront) {
      switch (this.frameCount) {
        case 0:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot1'], SPRITE_SIZE['shoot1'], this.backSprites);
        case 1:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot2'], SPRITE_SIZE['shoot2'], this.backSprites);
        case 2:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot3'], SPRITE_SIZE['shoot3'], this.backSprites);
        case 3:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot4'], SPRITE_SIZE['shoot4'], this.backSprites);
        case 4:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot5'], SPRITE_SIZE['shoot5'], this.backSprites);
        case 5:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot6'], SPRITE_SIZE['shoot6'], this.backSprites);
        case 6:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot7'], SPRITE_SIZE['shoot7'], this.backSprites);
        case 7:
          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot8'], SPRITE_SIZE['shoot8'], this.backSprites);
      }
    }

    if (this.verticalPerspective > 0) {
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
    if (this.shooting || this.shootingUp || this.isHit) {
      this.tickCount += 1;
    } else if (this.movingTo !== 0) {
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
      if (this.frameCount === this.maxFrameCount) {
        this.frameCount = 0;
        this.shooting = false;
        this.shootingUp = false;
        setTimeout(() => {
          if (this.reloading === true) this.reloading = false;
        }, CONSTANTS.RELOAD_TIME);
      }
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
      this.onGround = false;
      this.pos = yMoveTo;
    } else if (yMoveTo.y > this.pos.y) {
      // player is on the ground
      yVel = 0;
      this.jumping = false;
      this.onGround = true;
    }

    this.vel = new Vector(xVel, yVel);
  }

  step(timeStep, state) {
    this.handleFrames();
    this.handleMovement(timeStep, state);
  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    // [15, 25] is taken as the default sprite size
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 15;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 25;

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
}

module.exports = Player;