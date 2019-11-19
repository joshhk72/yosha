const CONSTANTS = {
  WIDTH: 55,
  HEIGHT: 75,
  TICKS_PER_FRAME: 0,
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

const SPRITE_SIZE = {
  walk: [17, 26],
  stand: [17, 26],
  jump1: [17, 26],
  jump2: [19, 26],
  fall: [21, 26]
};


class Player {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.front = true; // facing front at the start
    this.width = CONSTANTS.WIDTH;
    this.height = CONSTANTS.HEIGHT;
    this.frontSprites = new Image();
    this.backSprites = new Image();
    this.frontSprites.src = '../assets/sprites/yoshi.png';
    this.backSprites.src = '../assets/sprites/back-yoshi.png';
    
    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
    this.frame = 0;
    this.tickCount = 0;
    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;
  }

  draw(ctx) {
    this.render(ctx);
  }

  render(ctx) {
    this.selectSprite(ctx, FRONT_SPRITE_POS['fall'], SPRITE_SIZE['fall'], this.frontSprites);
  }

  selectSprite(ctx, coordinates, size, spritesImg) {
    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // s is source, d is destination
    ctx.drawImage(spritesImg, 
      coordinates[0], coordinates[1], 
      size[0], size[1],
      this.pos[0], this.pos[1],
      this.width, this.height);
  }

  collided(hitbox) {
  }

  isHit(projectile) {
  }
}

module.exports = Player;