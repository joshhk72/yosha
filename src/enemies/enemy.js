class Enemy {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.isHit = false; // for small invincibility frame upon being hit (as well as animation)
    this.frameCount = 0;
    this.tickCount = 0;
    // maxFrames and ticksPerFrame may differ per enemy!
  }
  
  get type() {
    return "enemy";
  }

  getHit() {
    this.tickCount = 0;
    this.isHit = true;
  }

  step(timeStep, state) {
    this.handleFrames();
    this.handleMovement(timeStep, state);
  }
}

module.exports = Enemy;