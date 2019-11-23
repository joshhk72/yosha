const Player = require("./player.js");
const Game = require("./game");
const Footer = require("./start/footer");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const footerCanvas = document.getElementById("footer-canvas");
  const ctx = canvas.getContext('2d');
  const footerCtx = footerCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const footer = new Footer(footerCtx)
  const game = new Game(ctx);
  game.start();
});