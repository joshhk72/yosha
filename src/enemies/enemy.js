class Enemy {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.isHit = false; // for small invincibility frame upon being hit (as well as animation)
    this.life = 1; // default, but enemies can have different amounts of lives
    this.frameCount = 0;
    this.tickCount = 0;
    // maxFrames and ticksPerFrame may differ per enemy!
  }
  
  get type() {
    return "enemy";
  }

  getHit() {
    this.tickCount = 0;
    this.frameCount = 0;
    this.isHit = true;
    this.startedMoving = false; // this is usually set to true when the enemy comes within the viewport

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