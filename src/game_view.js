const Game = require("./game.js");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game();

    this.started = false;
    this.over = false;
    this.paused = false;
    this.render = this.render.bind(this);
  }

  start() {
    this.bindKeyHandlers();
    this.render();
  }

  step() {
    this.game.step();
    this.game.draw(this.ctx);
  }

  render() {
    if (!this.over && !this.paused) {
      requestAnimationFrame(this.render);
      this.step();
    }
  }

  bindKeyHandlers() {
    // key('w', () => { this.game.ship.power([0, -CONSTANTS.POWER]) });
    // key('a', () => { this.game.ship.power([-CONSTANTS.POWER, 0]) });
    // key('s', () => { this.game.ship.power([0, CONSTANTS.POWER]) });
    // key('d', () => { this.game.ship.power([CONSTANTS.POWER, 0]) });
    // key('space', () => { this.game.ship.fireBullet() });
  }
}

module.exports = GameView;