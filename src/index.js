const Player = require("./player.js");
const Game = require("./game");
const Footer = require("./start/footer");
const KeyGuide = require("./start/key_guide");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const footerCanvas = document.getElementById("footer-canvas");
  const keyCanvas = document.getElementById("keys");
  const ctx = canvas.getContext('2d');
  const footerCtx = footerCanvas.getContext('2d');
  const keyCtx = keyCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const footer = new Footer(footerCtx)
  const keyGuide = new KeyGuide(keyCtx);
  const game = new Game(ctx);
  game.start();
  keyGuide.render();
});