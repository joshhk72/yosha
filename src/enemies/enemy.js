class Enemy {
  constructor(pos, char) {
    this.pos = pos;
    this.char = char;
    this.isHit = false; // for small invincibility frame upon being hit (as well as animation)
    this.life = 1; // default, but enemies can have different amounts of lives
    this.frameCount = 0;
    this.tickCount = 0;
    this.muted = false;
    this.hitSound = new Audio('./assets/audio/enemy-hit.wav');
    this.hitSound.volume = 0.5;
    // maxFrames and ticksPerFrame may differ per enemy!
  }
  
  get type() {
    return "enemy";
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