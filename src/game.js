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
    this.lost = false;
    this.won = false;
    this.paused = false;
    this.muted = false;
    this.victoryMusic = new Audio('./assets/audio/victory.wav');
    this.victoryMusic.volume = 0.2;
    this.defeatMusic = new Audio('./assets/audio/gameover.wav');
    this.defeatMusic.volume = 0.2;
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
    this.won = false;
    this.lost = false;
    if (this.muted) this.currentLevel.mute();
    this.playing = true;
    this.render();
  }

  mute() {
    const button = document.getElementById("mute");
    if (this.playing && !this.muted && !this.lost && !this.won) {
      this.muted = true;
      this.currentLevel.mute();
      button.classList.remove("fa-volume-down");
      button.classList.add("fa-volume-mute");
    } else if (this.playing && this.muted && !this.lost && !this.won) {
      this.muted = false;
      this.currentLevel.unmute();
      button.classList.remove("fa-volume-mute");
      button.classList.add("fa-volume-down");
    }
  }

  pause() {
    const button = document.getElementById("pause");
    if (this.playing && !this.paused && !this.lost && !this.won) {
      this.paused = true;
      this.currentLevel.mute()
      button.classList.remove("fa-play");
      button.classList.add("fa-pause");
    } else if (this.playing && this.paused && !this.lost && !this.won) {
      this.paused = false;
      if (!this.muted) this.currentLevel.unmute();
      button.classList.remove("fa-pause");
      button.classList.add("fa-play");
      this.render();
    }
  }

  celebrateWin() {
    this.playing = false;
    this.currentLevel.mute();
    if (!this.muted) {
      this.victoryMusic.currentTime = 0;
      this.victoryMusic.play();
    }
    const screen = document.getElementById("victory-screen");
    screen.style.display = "flex";
    console.log("You win!");
  }

  mournLoss() {
    this.playing = false;
    this.currentLevel.mute();
    if (!this.muted) {
      this.defeatMusic.currentTime = 0;
      this.defeatMusic.play();
    }
    const screen = document.getElementById("defeat-screen");
    screen.style.display = "flex";
    console.log("You lose :(");
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
    
    if (this.currentLevel.won) { 
      this.won = true;
      this.celebrateWin();
    };
    if (this.currentLevel.lost) {
      this.lost = true;
      this.mournLoss();
    };
    this.currentLevel.step(CONSTANTS.TIME);
    this.currentLevel.draw(this.ctx);
  }

  render() {
    if (!this.won && !this.lost && !this.paused) {
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
    key('left', () => { if (this.playing) this.currentLevel.state.player.moveTo(-1) });
    key('right', () => { if (this.playing) this.currentLevel.state.player.moveTo(1) });
    key('up', () => {
      if (!this.playing) return; 
      this.currentLevel.state.player.checkDoor(this.currentLevel.state); 
      this.currentLevel.state.player.lookVertically(1) 
    });
    key('down', () => { if (this.playing) this.currentLevel.state.player.lookVertically(-1) });
    key('p', () => this.pause() );
    key('m', () => this.mute());
    key('z', () => { if (this.playing) this.currentLevel.state.player.jump() });
    key('x', () => {
      if (!this.playing) return; 
      if (!key.isPressed("up")) {
        this.currentLevel.state.player.shoot(this.currentLevel.state);
      } else {
        this.currentLevel.state.player.shootUp(this.currentLevel.state);
      }
    });
    
    document.addEventListener("click", this.handleClick, false);
  }
}

module.exports = Game;