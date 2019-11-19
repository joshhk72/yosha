const Player = require("./player.js");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  ctx.rect(0, 0, 1200, 800);
  ctx.fill();

  const gameView = new GameView(ctx);
  gameView.start();


  // const player = new Player({ pos:[0,0], vel:[0,0] });
  // player.render(ctx);
});