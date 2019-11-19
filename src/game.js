const Player = require("./player.js");

const CONSTANTS = {
  DIM_X: 1200,
  DIM_Y: 800,
  PLAYER_START: { pos: [10, 200], vel: [0, 0] },
};

class Game {
  constructor() {
    this.player = new Player(CONSTANTS.PLAYER_START);
    this.img = new Image();
    this.img.src = '../assets/sprites/background.png';
  }

  draw(ctx) {
    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    ctx.drawImage(this.img, 0, 0, 1200, 800);
    this.player.draw(ctx);
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  moveObjects() {
  }

  checkCollisions() {
  }
}

module.exports = Game;