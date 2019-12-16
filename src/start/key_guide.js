const UP_SPRITE_POS = {
  up: [192, 65],
  left: [176, 81],
  right: [208, 81],
  w: [64, 33],
  a: [48, 49],
  d: [80, 49],
  z: [48, 65],
  x: [64, 65],
  k: [160, 49],
  l: [176, 49],
};

const DOWN_SPRITE_POS = {
  up: [192, 161],
  left: [176, 177],
  right: [208, 177],
  w: [64, 129],
  a: [48, 145],
  d: [80, 145],
  z: [48, 161],
  x: [64, 161],
  k: [160, 145],
  l: [176, 145],
};

const CANVAS_KEY_POS = {
  up: [162, 30],
  left: [130, 60],
  right: [194, 60],
  z: [23, 60],
  x: [57, 60],
  w: [55, 30],
  a: [23, 60],
  d: [87, 60],
  k: [160, 60],
  l: [194, 60],
}

const CONSTANTS = {
  HEIGHT: 140,
  WIDTH: 250,
  IMAGE_WIDTH: 32,
  IMAGE_HEIGHT: 30,
  SPRITE_SIZE: [16, 15],
};

class KeyGuide {
  constructor(ctx) {
    this.ctx = ctx;
    this.sprites = new Image();
    this.sprites.src = './assets/sprites/keys.png';
    this.mainKeys = ['up', 'left', 'right', 'z', 'x'];
    this.altKeys = ['w', 'a', 'd', 'l', 'k'];
    this.step = this.step.bind(this);
    this.draw = this.draw.bind(this);
    this.drawKey = this.drawKey.bind(this);
    this.render = this.render.bind(this);
  }

  draw(keys) {
    this.ctx.fillStyle = "#8fec8f";
    this.ctx.fillRect(0, 0, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    keys.forEach(key => {
      this.drawKey(key);
    })
    this.ctx.font = "bold 16px Arial";
    this.ctx.fillStyle = "black";
    if (key.getScope() === 'main') {
      this.ctx.fillText("Move", 157, 113);
      this.ctx.fillText("Jump", 14, 113);
      this.ctx.fillText("Shoot", 60, 113);
    } else {
      this.ctx.fillText("Move", 51, 113);
      this.ctx.fillText("Shoot", 146, 113);
      this.ctx.fillText("Jump", 196, 113);
    }
  }

  drawKey(k) {
    const spritePos = key.isPressed(k) ? DOWN_SPRITE_POS[k] : UP_SPRITE_POS[k];
    const coordinates = CANVAS_KEY_POS[k];
    console.log(CANVAS_KEY_POS[k]);

    this.ctx.drawImage(this.sprites,
      spritePos[0], spritePos[1],
      CONSTANTS.SPRITE_SIZE[0], CONSTANTS.SPRITE_SIZE[1],
      coordinates[0], coordinates[1],
      CONSTANTS.IMAGE_WIDTH, CONSTANTS.IMAGE_HEIGHT);
  }

  step() {
    if (key.getScope() === 'main') {
      this.draw(this.mainKeys);
    } else {
      this.draw(this.altKeys);
    }
  }

  render() {
    requestAnimationFrame(this.render);
    this.step();
  }


}

module.exports = KeyGuide;