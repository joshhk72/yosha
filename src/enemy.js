// options will look like
// const options = {
//   pos: [20, 20],
//   vel: [5, 5],
//   size: [2, 4]
// }

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
}

module.exports = HitboxObject;