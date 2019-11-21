const Player = require("./player.js");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const gameView = new Game(ctx);
  gameView.start();

  // const player = new Player({ pos:[0,0], vel:[0,0] });
  // player.render(ctx);
});