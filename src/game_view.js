const Game = require("./game.js");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game();

    this.started = false;
    this.over = false;
    this.paused = false;
    this.render = this.render.bind(this);
    this.step = this.step.bind(this);
  }

  start() {
    this.bindKeyHandlers();
    this.render();
  }

  step() {
    if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {
      this.game.player.moveTo(0);
    }
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
    key('left', () => { this.game.player.moveTo(-1) });
    key('right', () => { this.game.player.moveTo(1) });
  }
}

module.exports = GameView;