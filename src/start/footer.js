const SPRITE_POS = [
  [0, 6],
  [40, 6],
  [80, 6],
  [120, 6]
];

class Footer {
  constructor(ctx) {
    this.ctx = ctx;
    this.clicked = 0;
    this.sprites = new Image();
    this.draw = this.draw.bind(this);
    this.sprites.onload = () => this.draw(0);
    this.sprites.src = './assets/sprites/tamagotchi.png';
    this.canvas = document.getElementById("footer-canvas");
    this.info = document.getElementById("footer-info");
    this.canvas.onclick = () => {
      if (this.clicked < 3) {
        this.clicked += 1;
        this.draw(this.clicked);
        if (this.clicked === 3) this.info.style.visibility = 'visible';
      }
    }
  }

  draw(i) {
    this.ctx.drawImage(this.sprites,
      SPRITE_POS[i][0], SPRITE_POS[i][1],
      35, 35,
      0, 0,
      75, 75);
  }

  handleClick() {

  }


}

module.exports = Footer;