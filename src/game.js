//const Game = require("./game.js");
const Level = require("./level.js");
const StartScreen = require("./start/screen");
const GAME_LEVELS = require("./levels");

const CONSTANTS = {
  TIME: 0.1,
  HEIGHT: 450,
  WIDTH: 950,
};

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.started = false;
    this.over = false;
    this.paused = false;
    this.currentLevel = new Level(GAME_LEVELS[0]); // default but changes;
    this.render = this.render.bind(this);
    this.step = this.step.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectLevel = this.selectLevel.bind(this);

    this.startScreen = new StartScreen(this.selectLevel);
  }

  selectLevel(level) {
    this.currentLevel = new Level(level);
    this.render();
  }

  start() {
    this.bindKeyHandlers();
    // this.render();
  }

  step() {
    if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {
      this.currentLevel.player.moveTo(0);
    }
    if ((!key.isPressed('up') && !key.isPressed('down')) || (key.isPressed('up') && key.isPressed('down'))) {
      this.currentLevel.player.lookVertically(0);
    }
    
    this.currentLevel.step(CONSTANTS.TIME);
    this.currentLevel.draw(this.ctx);
  }

  render() {
    if (!this.over && !this.paused) {
      requestAnimationFrame(this.render);
      this.step();
    }
  }

  handleClick(e) {
    // This function was made when considering a Canvas based game-start UI.
    // But a DOM UI will work just fine (since this app is mostly for use on a browser!)
    // const canvas = document.getElementById("canvas");
    // const mouseX = e.pageX - canvas.offsetLeft;
    // const mouseY = e.pageY - canvas.offsetTop;
    // if (mouseX >= 0 && mouseX <= CONSTANTS.WIDTH && mouseY >= 0 && mouseY <= CONSTANTS.HEIGHT) {
    //   console.log(mouseX, mouseY); 
    // }
  }

  bindKeyHandlers() {
    key('left', () => { this.currentLevel.player.moveTo(-1) });
    key('right', () => { this.currentLevel.player.moveTo(1) });
    key('up', () => { this.currentLevel.player.lookVertically(1) });
    key('down', () => { this.currentLevel.player.lookVertically(-1) });
    key('z', () => { this.currentLevel.player.jump() });
    key('x', () => { 
      if (!key.isPressed("up")) {
        this.currentLevel.player.shoot(this.currentLevel.state);
      } else {
        this.currentLevel.player.shootUp(this.currentLevel.state);
      }
    });
    
    document.addEventListener("click", this.handleClick, false);
  }
}

module.exports = Game;