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

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\nconst CONSTANTS = {\n  DIM_X: 900,\n  DIM_Y: 500,\n};\n\nclass Game {\n  constructor() {\n    this.player = new Player();\n    this.img = new Image();\n    this.img.src = '../assets/sprites/background.png';\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    ctx.drawImage(this.img, 0, 0, 900, 500);\n    this.player.draw(ctx);\n  }\n\n  step() {\n    this.moveObjects();\n    this.checkCollisions();\n  }\n\n  moveObjects() {\n    this.player.step();\n  }\n\n  checkCollisions() {\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass GameView {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.game = new Game();\n\n    this.started = false;\n    this.over = false;\n    this.paused = false;\n    this.render = this.render.bind(this);\n    this.step = this.step.bind(this);\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.render();\n  }\n\n  step() {\n    if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {\n      this.game.player.moveTo(0);\n    }\n    this.game.step();\n    this.game.draw(this.ctx);\n  }\n\n  render() {\n    if (!this.over && !this.paused) {\n      requestAnimationFrame(this.render);\n      this.step();\n    }\n  }\n\n  bindKeyHandlers() {\n    key('left', () => { this.game.player.moveTo(-1) });\n    key('right', () => { this.game.player.moveTo(1) });\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n  ctx.imageSmoothingEnabled = false;\n  const gameView = new GameView(ctx);\n  gameView.start();\n\n\n  // const player = new Player({ pos:[0,0], vel:[0,0] });\n  // player.render(ctx);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nconst CONSTANTS = {\n  WIDTH: 50,\n  HEIGHT: 68,\n  TICKS_PER_FRAME: 6,\n  STARTING_VEL: new Vector(0, 0),\n  STARTING_POS: new Vector(430, 380),\n  MAX_FRAME_COUNT: 7,\n};\n\nconst FRONT_SPRITE_POS = {\n  walk1: [718, 3],\n  walk2: [698, 3],\n  walk3: [680, 3],\n  walk4: [663, 3],\n  walk5: [646, 3],\n  walk6: [629, 3],\n  walk7: [612, 3],\n  walk8: [595, 3],\n  stand: [578, 3],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst BACK_SPRITE_POS = {\n  walk1: [141, 3],\n  walk2: [124, 3],\n  walk3: [107, 3],\n  walk4: [90, 3],\n  walk5: [73, 3],\n  walk6: [56, 3],\n  walk7: [39, 3],\n  walk8: [21, 3],\n  stand: [1, 3],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst SPRITE_SIZE = {\n  walk: [17, 26],\n  stand: [17, 26],\n  jump1: [17, 26],\n  jump2: [19, 26],\n  fall: [21, 26]\n};\n\n\nclass Player {\n  constructor() {\n    this.type = \"player\"; // This is for later, when levels start tracking 'actors' by types...\n    this.pos = CONSTANTS.STARTING_POS;\n    this.vel = CONSTANTS.STARTING_VEL;\n    this.width = CONSTANTS.WIDTH;\n    this.height = CONSTANTS.HEIGHT;\n    this.frontSprites = new Image();\n    this.backSprites = new Image();\n    this.frontSprites.src = '../assets/sprites/yoshi.png';\n    this.backSprites.src = '../assets/sprites/back-yoshi.png';\n    \n    this.facingFront = true; // facing front at the start\n    this.wasMoving = 0;\n    this.movingTo = 0;\n    this.jumping = false;\n    \n    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/\n    this.frameCount = 0;\n    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;\n    this.tickCount = 0;\n    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;\n  }\n\n  static create() {\n    return new Player();\n  }\n\n  \n  moveTo(num) {\n    this.movingTo = num;\n  }\n\n  draw(ctx) {\n    if (this.movingTo === 0) {\n      return this.facingFront ? this.selectSprite(ctx, FRONT_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.frontSprites)\n        : this.selectSprite(ctx, BACK_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.backSprites);\n    } else if (this.movingTo > 0) {\n      switch(this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 1:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 2:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 3:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 4:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 5:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 6:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 7:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.frontSprites);\n      }\n    } else if (this.movingTo < 0) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.backSprites);\n        case 1:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.backSprites);\n        case 2:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.backSprites);\n        case 3:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.backSprites);\n        case 4:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.backSprites);\n        case 5:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.backSprites);\n        case 6:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.backSprites);\n        case 7:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.backSprites);\n        }\n    }\n  }\n\n  step() {\n    // Increment ticks if continuously moving\n    if (this.wasMoving === this.movingTo) {\n      this.tickCount += 1;\n    } else {\n      this.tickCount = 0;\n      this.frameCount = 0;\n    }\n\n    // Increment frames if enough ticks are reached on the same action\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n      this.frameCount += 1;\n      if (this.frameCount === this.maxFrameCount) this.frameCount = 0; \n    }\n\n    // If the player isn't standing still, then update 'front' status\n    if (this.movingTo !== 0) this.facingFront = this.movingTo > 0;\n\n    // Update this for checks done during the next step\n    this.wasMoving = this.movingTo;\n  }\n\n  selectSprite(ctx, coordinates, size, spritesImg) {\n    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);\n    // s is source, d is destination\n    ctx.drawImage(spritesImg, \n      coordinates[0], coordinates[1], \n      size[0], size[1],\n      this.pos.x, this.pos.y,\n      this.width, this.height);\n  }\n\n  collided(hitbox) {\n  }\n\n  isHit(projectile) {\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Vector {\n  constructor(x, y) {\n    this.x = x; this.y = y;\n  }\n  plus(other) {\n    return new Vec(this.x + other.x, this.y + other.y);\n  }\n  times(factor) {\n    return new Vec(this.x * factor, this.y * factor);\n  }\n}\n\nmodule.exports = Vector;\n\n//# sourceURL=webpack:///./src/vector.js?");

/***/ })

/******/ });