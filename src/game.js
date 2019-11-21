//const Game = require("./game.js");
const Level = require("./level.js");
const StartScreen = require("./start/screen");
const { GAME_LEVELS, MUSIC_LIST } = require("./levels");

const CONSTANTS = {
  TIME: 0.1,
  HEIGHT: 450,
  WIDTH: 950,
};

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.playing = false;
    this.over = false;
    this.paused = false;
    this.muted = false;
    this.currentLevel = undefined; // default but changes;
    this.render = this.render.bind(this);
    this.step = this.step.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectLevel = this.selectLevel.bind(this);
    this.pause = this.pause.bind(this);
    this.mute = this.mute.bind(this);

    // prevent scrolling on window with space or arrow keys!
    window.addEventListener("keydown", function (e) {
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);

    this.startScreen = new StartScreen(this.selectLevel);
  }

  selectLevel(level, music) {
    this.currentLevel = new Level(level, music);
    this.playing = true;
    this.render();
  }

  mute() {
    const button = document.getElementById("mute");
    if (this.playing && !this.muted && !this.over) {
      this.muted = true;
      this.currentLevel.mute();
      button.classList.remove("fa-volume-down");
      button.classList.add("fa-volume-mute");
    } else if (this.playing && this.muted && !this.over) {
      this.muted = false;
      this.currentLevel.unmute();
      button.classList.remove("fa-volume-mute");
      button.classList.add("fa-volume-down");
    }
  }

  pause() {
    const button = document.getElementById("pause");
    if (this.playing && !this.paused && !this.over) {
      this.paused = true;
      this.currentLevel.mute()
      button.classList.remove("fa-play");
      button.classList.add("fa-pause");
    } else if (this.playing && this.paused && !this.over) {
      this.paused = false;
      if (!this.muted) this.currentLevel.unmute();
      button.classList.remove("fa-pause");
      button.classList.add("fa-play");
      this.render();
    }
  }

  start() {
    this.bindKeyHandlers();
    this.bindClickHandlers();
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

  bindClickHandlers() {
    const pauseButton = document.getElementById("pause");
    const muteButton = document.getElementById("mute");
    pauseButton.onclick = () => this.pause();
    muteButton.onclick = () => this.mute();
  }

  bindKeyHandlers() {
    key('left', () => { this.currentLevel.player.moveTo(-1) });
    key('right', () => { this.currentLevel.player.moveTo(1) });
    key('up', () => { this.currentLevel.player.lookVertically(1) });
    key('down', () => { this.currentLevel.player.lookVertically(-1) });
    key('p', () => this.pause() );
    key('m', () => this.mute());
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