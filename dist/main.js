/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\nconst CONSTANTS = {\n  DIM_X: 1200,\n  DIM_Y: 800,\n  PLAYER_START: { pos: [10, 200], vel: [0, 0] },\n};\n\nclass Game {\n  constructor() {\n    this.player = new Player(CONSTANTS.PLAYER_START);\n    this.img = new Image();\n    this.img.src = '../assets/sprites/background.png';\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    ctx.drawImage(this.img, 0, 0, 1200, 800);\n    this.player.draw(ctx);\n  }\n\n  step() {\n    this.moveObjects();\n    this.checkCollisions();\n  }\n\n  moveObjects() {\n  }\n\n  checkCollisions() {\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass GameView {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.game = new Game();\n\n    this.started = false;\n    this.over = false;\n    this.paused = false;\n    this.render = this.render.bind(this);\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.render();\n  }\n\n  step() {\n    this.game.step();\n    this.game.draw(this.ctx);\n  }\n\n  render() {\n    if (!this.over && !this.paused) {\n      requestAnimationFrame(this.render);\n      this.step();\n    }\n  }\n\n  bindKeyHandlers() {\n    // key('w', () => { this.game.ship.power([0, -CONSTANTS.POWER]) });\n    // key('a', () => { this.game.ship.power([-CONSTANTS.POWER, 0]) });\n    // key('s', () => { this.game.ship.power([0, CONSTANTS.POWER]) });\n    // key('d', () => { this.game.ship.power([CONSTANTS.POWER, 0]) });\n    // key('space', () => { this.game.ship.fireBullet() });\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n  ctx.rect(0, 0, 1200, 800);\n  ctx.fill();\n\n  const gameView = new GameView(ctx);\n  gameView.start();\n\n\n  // const player = new Player({ pos:[0,0], vel:[0,0] });\n  // player.render(ctx);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CONSTANTS = {\n  WIDTH: 55,\n  HEIGHT: 75,\n  TICKS_PER_FRAME: 0,\n};\n\nconst FRONT_SPRITE_POS = {\n  walk1: [718, 3],\n  walk2: [698, 3],\n  walk3: [680, 3],\n  walk4: [663, 3],\n  walk5: [646, 3],\n  walk6: [629, 3],\n  walk7: [612, 3],\n  walk8: [595, 3],\n  stand: [578, 3],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst BACK_SPRITE_POS = {\n  walk1: [141, 3],\n  walk2: [124, 3],\n  walk3: [107, 3],\n  walk4: [90, 3],\n  walk5: [73, 3],\n  walk6: [56, 3],\n  walk7: [39, 3],\n  walk8: [21, 3],\n  stand: [1, 3],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst SPRITE_SIZE = {\n  walk: [17, 26],\n  stand: [17, 26],\n  jump1: [17, 26],\n  jump2: [19, 26],\n  fall: [21, 26]\n};\n\n\nclass Player {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.front = true; // facing front at the start\n    this.width = CONSTANTS.WIDTH;\n    this.height = CONSTANTS.HEIGHT;\n    this.frontSprites = new Image();\n    this.backSprites = new Image();\n    this.frontSprites.src = '../assets/sprites/yoshi.png';\n    this.backSprites.src = '../assets/sprites/back-yoshi.png';\n    \n    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/\n    this.frame = 0;\n    this.tickCount = 0;\n    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;\n  }\n\n  draw(ctx) {\n    this.render(ctx);\n  }\n\n  render(ctx) {\n    this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.backSprites);\n  }\n\n  selectSprite(ctx, coordinates, size, spritesImg) {\n    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);\n    // s is source, d is destination\n    ctx.drawImage(spritesImg, \n      coordinates[0], coordinates[1], \n      size[0], size[1],\n      this.pos[0], this.pos[1],\n      this.width, this.height);\n  }\n\n  collided(hitbox) {\n  }\n\n  isHit(projectile) {\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });