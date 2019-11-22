const Bullet = require('./bullet');
const Vector = require('../vector');

const CONSTANTS = {
  BULLET_VEL: 0.4,
};

class Enemy {
  constructor(pos, char) {
    this.pos = pos;
    this.char = char;
    this.isHit = false; // for small invincibility frame upon being hit (as well as animation)
    this.life = 1; // default, but enemies can have different amounts of lives
    this.reloading = false;
    this.reloadTime = 3000; // adjust if enemy should shoot faster/slower
    this.frameCount = 0;
    this.tickCount = 0;
    this.muted = false;
    this.hitSound = new Audio('./assets/audio/enemy-hit.wav');
    this.hitSound.volume = 0.5;
    // maxFrames and ticksPerFrame may differ per enemy!

    this.reload = this.reload.bind(this);
  }
  
  get type() {
    return "enemy";
  }

  shoot(state, extraWidth, extraHeight) {
    const moreX = extraWidth || 0;
    const moreY = extraHeight || 0;

    if (this.startedMoving && !this.reloading) {
      const direction = state.player.pos.minus(this.pos);
      const bulletVel = CONSTANTS.BULLET_VEL;
      const bullet = new Bullet(new Vector(this.pos.x + moreX, this.pos.y + moreY), direction.scale(bulletVel));
      state.actors.push(bullet);
      this.reloading = true;
      setTimeout(() => {
        this.reload();
      }, this.reloadTime);
    }
  }

  reload() {
    this.reloading = false;
  }

  startMoving() {
    // this method will be used for most enemies, might as well have a default!
  }

  considerTurning() {
    // this method will be used for most enemies, might as well have a default!
  }

  mute() {
    this.muted = true;
  }

  unmute() {
    this.muted = false;
  }

  getHit() {
    this.tickCount = 0;
    this.frameCount = 0;
    this.isHit = true;
    this.startedMoving = false; // this is usually set to true when the enemy comes within the viewport
    if (!this.muted) {
      this.hitSound.currentTime = 0.2;
      this.hitSound.play();
    }
    // this.life is decremented in the below function, since the animation must happen first!
  }

  finishGettingHit() {
    this.isHit = false;
    this.life -= 1;
    if (this.life < 0) this.life = 0; // Just in case there's a bug LOL.
  }

  step(timeStep, state) {
    this.handleFrames();
    this.handleMovement(timeStep, state);
  }
}

module.exports = Enemy;