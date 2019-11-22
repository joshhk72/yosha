SPRITE_POS = [
  [57, 67],
  [210, 36],
  [364, 7],
  [553, 14],
  [7, 222],
  [193, 220],
  [373, 222],
  [553, 220],
  [4, 424],
  [184, 421],
  [364, 419],
  [546, 419],
  [0, 625],
  [189, 632],
  [372, 637]
];

SPRITE_SIZE = [
  [57, 57],
  [118, 122],
  [177, 176],
  [163, 163],
  [161, 159],
  [155, 158],
  [159, 158],
  [163, 163],
  [169, 167],
  [173, 172],
  [177, 176],
  [177, 182],
  [177, 176],
  [163, 163],
  [158, 155]
];

const CONSTANTS = {
  TILE_SIZE: 50,
  MAX_TICKS: 6,
  MAX_FRAMES: 14,
};

const Vector = require('./vector.js');

class Door {
  constructor(pos) {
    this.pos = pos.minus(new Vector(0, 1));
    this.levelComplete = false;
    this.tickCount = 0;
    this.frameCount = 0;
    this.sprites = new Image();
    this.sprites.src = './assets/sprites/door.png';
  }

  static create(pos) {
    return new Door(pos);
  }

  get size() {
    return new Vector(2, 2);
  }

  get type() {
    return "door";
  }

  open() {
    this.levelComplete = true;
  }

  // doors don't move, so step only handles the frames
  step() {
    if (!this.levelComplete) return;
    this.tickCount += 1;
    if (this.tickCount > CONSTANTS.MAX_TICKS) {
      this.tickCount = 0;
      this.frameCount += 1;
    }
    if (this.frameCount > CONSTANTS.MAX_FRAMES) this.frameCount = 0;
  }

  draw(ctx, viewPortCenter) {
    if (!this.levelComplete) return;
    return this.selectSprite(ctx, SPRITE_POS[this.frameCount], SPRITE_SIZE[this.frameCount], viewPortCenter);
  }

  mute() { }

  unmute() { }

  selectSprite(ctx, coordinates, size, viewPortCenter) {
    // coordinates & size refer to SPRITE_SIZE and SPRITE_POS
    // [163, 163] is taken as the default sprite size
    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 163;
    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 163;

    const xOffset = (163 - size[0]) / 2 * 100/163;
    const yOffset = (163 - size[1]) / 2 * 100/163;

    const extraHeight = 10; // no one likes it when doors are too high.

    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x) + xOffset;
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y) + yOffset + extraHeight;

    ctx.drawImage(this.sprites,
      coordinates[0], coordinates[1],
      size[0], size[1],
      xOnScreen, yOnScreen,
      width, height);
  }
}

module.exports = Door;