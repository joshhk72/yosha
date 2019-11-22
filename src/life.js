

class Life {
  constructor() {
    this.value = 5;
    this.sprites = new Image();
    this.sprites.src = './assets/sprites/hearts/animated.png';
    this.hit = false;

    this.tickCount = 0;
    this.maxTick = 5;
    this.frameCount = 0;
    this.maxFrame = 4;
  }

  lose() {
    this.hit = true;
  }

  step() {
    if (this.hit) {
      this.tickCount += 1
      if (this.tickCount > this.maxTick) {
        this.tickCount = 0;
        this.frameCount += 1;
      } 
      if (this.frameCount > this.maxFrame) {
        this.hit = false;
        this.value -= 1;
        this.frameCount = 0;
      }
    }
  }
  
  draw(ctx) {
    // first few hearts
    let xPosition = 20;

    for (let i = 1; i < this.value; i++) {
      ctx.drawImage(this.sprites,
        0, 0,
        17, 17,
        xPosition, 15,
        25, 25
      );
      xPosition += 26;
    }

    if (this.value > 0) {
      switch (this.frameCount) {
        case 0:
          ctx.drawImage(this.sprites, 0, 0, 17, 17, xPosition, 15, 25, 25);
          break;
        case 1:
          ctx.drawImage(this.sprites, 17, 0, 17, 17, xPosition, 15, 25, 25);
          break;
        case 2:
          ctx.drawImage(this.sprites, 34, 0, 17, 17, xPosition, 15, 25, 25);
          break;
        case 3:
          ctx.drawImage(this.sprites, 51, 0, 17, 17, xPosition, 15, 25, 25);
          break;
        case 4:
          ctx.drawImage(this.sprites, 68, 0, 17, 17, xPosition, 10, 17, 17);
          break;
      }
      xPosition += 26;
    }

    for (let i = 1; i < (6 - this.value); i++) {
      ctx.drawImage(this.sprites,
        68, 0,
        17, 17,
        xPosition, 15,
        25, 25
      );
      xPosition += 26;
    }
  }

};

module.exports = Life;