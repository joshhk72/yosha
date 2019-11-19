const Player = require("./player.js");

const CONSTANTS = {
  DIM_X: 900,
  DIM_Y: 500,
};

class Game {
  constructor() {
    this.player = new Player();
    this.img = new Image();
    this.img.src = '../assets/sprites/background.png';
  }

  draw(ctx) {
    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    ctx.drawImage(this.img, 0, 0, 900, 500);
    this.player.draw(ctx);
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  moveObjects() {
    this.player.step();
  }

  checkCollisions() {
  }
}

module.exports = Game;