const CONSTANTS = {
  ticksPerFrame: 0,
};

const SPRITES = {
  walk1: [0, 0, 26, 26],
};

class HitboxObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = options.width;
    this.height = options.height;
    this.sprites = new Image();
    this.sprites.src = './assets/sprites/yoshi.png';

    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
    this.frame = 0;
    this.tickCount = 0;
    this.ticksPerFrame = CONSTANTS.ticksPerFrame;
  }

  draw(ctx) {
    ctx.clearRect(0,0,900,400);
    this.renderSprite(ctx);
  }

  render(ctx) {
    this.selectSprite(ctx, )
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

module.exports = HitboxObject;