//const Game = require("./game.js");
const Level = require("./level.js");
const GAME_LEVELS = require("./levels");

const CONSTANTS = {
  TIME: 0.1
};

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentLevel = new Level(GAME_LEVELS[0]);
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
      this.currentLevel.player.moveTo(0);
    }
    // this.game.step();
    this.currentLevel.step(CONSTANTS.TIME);
    this.currentLevel.draw(this.ctx);
  }

  render() {
    if (!this.over && !this.paused) {
      requestAnimationFrame(this.render);
      this.step();
    }
  }

  bindKeyHandlers() {
    key('left', () => { this.currentLevel.player.moveTo(-1) });
    key('right', () => { this.currentLevel.player.moveTo(1) });
    key('z', () => { this.currentLevel.player.jump() });
  }
}

module.exports = GameView;