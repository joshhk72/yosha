class HitboxObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.size = options.size;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    )
    ctx.fill();
  }

  collided(hitbox) {
  }

  isHit(projectile) {
  }
}

module.exports = HitboxObject;