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

/***/ "./src/door.js":
/*!*********************!*\
  !*** ./src/door.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector.js */ \"./src/vector.js\");\n\nclass Door {\n  constructor(pos) {\n    this.pos = pos;\n  }\n\n  static create(pos) {\n    return new Door(pos);\n  }\n\n  get size() {\n    return new Vector(1, 1);\n  }\n\n  step() {\n    \n  }\n\n  draw() {\n\n  }\n}\n\nmodule.exports = Door;\n\n//# sourceURL=webpack:///./src/door.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("//const Game = require(\"./game.js\");\nconst Level = __webpack_require__(/*! ./level.js */ \"./src/level.js\");\nconst GAME_LEVELS = __webpack_require__(/*! ./levels */ \"./src/levels.js\");\n\nconst CONSTANTS = {\n  TIME: 0.1\n};\n\nclass GameView {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.currentLevel = new Level(GAME_LEVELS[0]);\n    this.started = false;\n    this.over = false;\n    this.paused = false;\n    this.render = this.render.bind(this);\n    this.step = this.step.bind(this);\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.render();\n  }\n\n  step() {\n    if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {\n      this.currentLevel.player.moveTo(0);\n    }\n    if ((!key.isPressed('up') && !key.isPressed('down')) || (key.isPressed('up') && key.isPressed('down'))) {\n      this.currentLevel.player.lookVertically(0);\n    }\n    // this.game.step();\n    this.currentLevel.step(CONSTANTS.TIME);\n    this.currentLevel.draw(this.ctx);\n  }\n\n  render() {\n    if (!this.over && !this.paused) {\n      requestAnimationFrame(this.render);\n      this.step();\n    }\n  }\n\n  bindKeyHandlers() {\n    key('left', () => { this.currentLevel.player.moveTo(-1) });\n    key('right', () => { this.currentLevel.player.moveTo(1) });\n    key('up', () => { this.currentLevel.player.lookVertically(1) });\n    key('down', () => { this.currentLevel.player.lookVertically(-1) });\n    key('z', () => { this.currentLevel.player.jump() });\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n  ctx.imageSmoothingEnabled = false;\n  const gameView = new GameView(ctx);\n  gameView.start();\n\n  // const player = new Player({ pos:[0,0], vel:[0,0] });\n  // player.render(ctx);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// credit to https://eloquentjavascript.net/16_game.html\n// for both the code example and excellent writing\nconst Tile = __webpack_require__(/*! ./tile.js */ \"./src/tile.js\");\nconst Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst Door = __webpack_require__(/*! ./door.js */ \"./src/door.js\");\nconst Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\nconst State = __webpack_require__(/*! ./level_state */ \"./src/level_state.js\");\n\nconst CONSTANTS = {\n  DIM_X: 950,\n  DIM_Y: 450,\n  VIEWPORT_WIDTH: 19,\n  VIEWPORT_HEIGHT: 9,\n  VECT_TO_CENTER: new Vector(950/50/2, 450/50/2), // this is from the top left of the viewport\n};\n\nconst levelChars = {\n  \"@\": Player,\n  \"#\": Tile,\n  \"$\": Tile,\n  \"D\": Door,\n  \".\": \"empty\",\n};\n\nclass Level {\n  constructor(plan) {\n    this.doItOnce = false;\n    let rows = plan.trim().split(\"\\n\").map(l => [...l]);\n    this.height = rows.length;\n    this.width = rows[0].length;\n    this.background = new Image();\n    this.background.src = '../assets/sprites/background.png';\n    this.status = \"playing\";\n    this.actors = [];\n    this.tiles = [];\n    this.playerCount = 0;\n\n    this.rows = rows.map((row, y) => {\n      return row.map((ch, x) => {\n        let type = levelChars[ch];\n        if (typeof type === \"string\") return type;\n        if (type === Tile) {\n          const newTile = type.create(new Vector(x, y), ch);\n          this.tiles.push(newTile);\n          return newTile; \n        }\n        const newActor = type.create(new Vector(x, y), ch);\n        if (newActor.type === \"player\") {\n          this.player = newActor;\n          this.playerCount += 1;\n        }\n        this.actors.push(\n          newActor);\n        return \"empty\";\n      });\n    });\n\n    if (this.playerCount !== 1) throw new Error('Every level must have exactly one player!');\n    this.scrollPlayerIntoView.bind(this)();\n\n    // Bound functions\n    this.inViewPort = this.inViewPort.bind(this);\n\n    this.state = State.start(this);\n  }\n\n  step(timeStep) {\n    if (!this.doItOnce) { // for bug-testing\n      this.doItOnce = true;\n      console.log(this.actors);\n      // console.log(this.tiles);\n      // console.log(this.player);\n      // console.log(this.viewPortCenter);\n    }\n\n    // Step for player, and move viewport sideways if needed\n\n    this.actors.forEach(actor => {\n      if (actor.type === \"player\") {\n        this.player.step(timeStep, this.state);\n        if (this.player.pos.x > this.viewPortCenter.x + 3) {\n          this.viewPortCenter.x = this.player.pos.x - 3;\n        } else if (this.player.pos.x < this.viewPortCenter.x - 3) {\n          this.viewPortCenter.x = this.player.pos.x + 3;\n        }\n    \n        if (this.player.pos.y > this.viewPortCenter.y + 2) {\n          this.viewPortCenter.y = this.player.pos.y - 2;\n        } else if (this.player.pos.y < this.viewPortCenter.y - 2) {\n          this.viewPortCenter.y = this.player.pos.y + 2;\n        }\n      } else {\n        actor.step(timeStep, this.state);\n      }\n\n    })\n\n\n\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    ctx.drawImage(this.background, 0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    // this function should draw the viewport!\n    this.tiles.forEach(tile => {\n      if (this.inViewPort(tile)) {\n        tile.draw(ctx, this.viewPortCenter);\n      };\n    });\n\n    this.actors.forEach(actor => {\n      if (this.inViewPort(actor)) {\n        actor.draw(ctx, this.viewPortCenter); \n      };\n    })\n  }\n\n  scrollPlayerIntoView() {\n    this.viewPortCenter = this.player.pos.plus(new Vector(0, -1.5));\n  }\n\n  inViewPort(element) {\n    const distance = this.viewPortCenter.distanceFrom(element.pos);\n    return (\n      distance.x < CONSTANTS.VIEWPORT_WIDTH / 2 + element.size.x \n      || distance.y > CONSTANTS.VIEWPORT_HEIGHT / 2 + element.size.y\n    );\n  }\n\n  touches(pos, size, type) {\n    const xStart = Math.floor(pos.x);\n    const xEnd = Math.ceil(pos.x + size.x);\n    const yStart = Math.floor(pos.y);\n    const yEnd = Math.ceil(pos.y + size.y);\n\n    for (let y = yStart; y < yEnd; y++) {\n      for (let x = xStart; x < xEnd; x++) {\n        // Anything outside is treated as a wall, according to the source\n        let isOutside = x < 0 || x >= this.width ||\n          y < 0 || y >= this.height;\n        let here = isOutside ? \"wall\" : this.rows[y][x].type;\n        if (here === type) return true;\n      }\n    }\n    return false;\n  }\n}\n\nmodule.exports = Level;\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/level_state.js":
/*!****************************!*\
  !*** ./src/level_state.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class State {\n  constructor(level, actors, status) {\n    this.level = level;\n    this.actors = actors;\n    this.status = status;\n  }\n\n  static start(level) {\n    return new State(level, level.startActors, \"playing\");\n  }\n\n  get player() {\n    return this.actors.find(a => a.type == \"player\");\n  }\n}\n\nmodule.exports = State;\n\n//# sourceURL=webpack:///./src/level_state.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const GAME_LEVELS = [`\n...........................................................\n...........................................................\n...........................................................\n...........................................................\n...........................................................\n...........................................................\n..................######...................................\n...@......#####............................................\n##########$$$$$...............####.....................D...\n$$$$$$$$$$$$$$$###############$$$$#########################\n`\n]\n\nmodule.exports = GAME_LEVELS;\n\n//# sourceURL=webpack:///./src/levels.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\n// each tile on the map is going to be 50 x 50\n// this makes the player size 1 x 1.4 tiles\nconst CONSTANTS = {\n  WIDTH: 50,\n  HEIGHT: 70,\n  TILE_SIZE: 50,\n  TICKS_PER_FRAME: 6,\n  GRAVITY: 0.29,\n  X_SPEED: 0.4,\n  JUMP_SPEED: 1.1,\n  STARTING_VEL: new Vector(0, 0),\n  // STARTING_POS: new Vector(430, 380),\n  MAX_FRAME_COUNT: 7,\n};\n\nconst FRONT_SPRITE_POS = {\n  walk1: [699, 4],\n  walk2: [681, 4],\n  walk3: [664, 4],\n  walk4: [647, 4],\n  walk5: [630, 4],\n  walk6: [613, 5],\n  walk7: [596, 4],\n  walk8: [579, 4],\n  stand: [719, 4],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst BACK_SPRITE_POS = {\n  lookUp: [525, 4],\n  walk1: [142, 4],\n  walk2: [125, 4],\n  walk3: [108, 5],\n  walk4: [91, 4],\n  walk5: [74, 4],\n  walk6: [57, 4],\n  walk7: [40, 4],\n  walk8: [22, 4],\n  throw1: [167, 5],\n  throw2: [187, 4],\n  throw3: [207, 4],\n  throw4: [229, 4],\n  throw5: [253, 4],\n  throw6: [277, 4],\n  throw7: [299, 6],\n  throw8: [318, 4],\n  stand: [2, 4],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst SPRITE_SIZE = {\n  lookUp: [15, 25],\n  walk: [15, 25],\n  stand: [15, 25],\n  jump1: [17, 26],\n  jump2: [19, 26],\n  fall: [21, 26],\n  throw1: [17, 24],\n  throw2: [16, 25],\n  throw3: [19, 25],\n  throw4: [21, 25],\n  throw5: [21, 25],\n  throw6: [19, 25],\n  throw7: [15, 23],\n  throw8: [18, 25],\n};\n\n\nclass Player {\n  constructor(pos) {\n    // this.pos = CONSTANTS.STARTING_POS;\n    this.pos = pos.minus(new Vector(0, 0.333));\n    this.vel = CONSTANTS.STARTING_VEL;\n    this.frontSprites = new Image();\n    this.backSprites = new Image();\n    this.frontSprites.src = '../assets/sprites/yoshi.png';\n    this.backSprites.src = '../assets/sprites/back-yoshi.png';\n    \n    this.facingFront = true; // facing front at the start\n    this.movingTo = 0;\n    this.wasMoving = 0;\n    this.verticalPerspective = 0;\n    this.jumping = false;\n    \n    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/\n    this.frameCount = 0;\n    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;\n    this.tickCount = 0;\n    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;\n\n    this.handleFrames = this.handleFrames.bind(this);\n    this.handleMovement = this.handleMovement.bind(this);\n  }\n\n  static create(pos) {\n    return new Player(pos);\n  }\n\n  get type() {\n    return \"player\";\n  }\n\n  get size() {\n    return new Vector(0.8, 1.333);\n  }\n\n  // moveTo determines x-direction movement\n  moveTo(num) {\n    this.movingTo = num;\n    switch (num) {\n      case 1:\n        this.vel.x = CONSTANTS.X_SPEED;\n        break;\n      case -1:\n        this.vel.x = -CONSTANTS.X_SPEED;\n        break;\n      case 0:\n        this.vel.x = 0;\n        break;\n    }\n  }\n\n  lookVertically(num) {\n    this.verticalPerspective = num;\n  }\n\n  jump() {\n    if (!this.jumping) {\n      this.vel.y = -CONSTANTS.JUMP_SPEED;\n      this.jumping = true;\n    }\n  }\n\n  shootEgg() {\n\n  }\n\n  draw(ctx, viewPortCenter) {\n    this.viewPortCenter = viewPortCenter;\n    if (this.verticalPerspective > 0 && this.vel.x === 0) {\n      this.selectSprite(ctx, BACK_SPRITE_POS['lookUp'], SPRITE_SIZE['lookUp'], this.backSprites);\n    } else if (this.movingTo === 0) {\n      return this.facingFront ? this.selectSprite(ctx, FRONT_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.frontSprites)\n        : this.selectSprite(ctx, BACK_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.backSprites);\n    } else if (this.movingTo > 0) {\n      switch(this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 1:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 2:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 3:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 4:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 5:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 6:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 7:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.frontSprites);\n      }\n    } else if (this.movingTo < 0) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.backSprites);\n        case 1:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.backSprites);\n        case 2:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.backSprites);\n        case 3:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.backSprites);\n        case 4:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.backSprites);\n        case 5:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.backSprites);\n        case 6:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.backSprites);\n        case 7:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.backSprites);\n        }\n    }\n  }\n\n  handleFrames() {\n    // Increment ticks if continuously moving\n    if (this.movingTo !== 0) {\n      if (this.wasMoving === this.movingTo) {\n        this.tickCount += 1;\n      } else {\n        this.tickCount = 0;\n        this.frameCount = 0;\n      }\n    } else { // just in case ticks & frames are used for something else than walking!\n      this.tickCount = 0;\n      this.frameCount = 0;\n    }\n\n    // Increment frames if enough ticks are reached on the same action\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n      this.frameCount += 1;\n      if (this.frameCount === this.maxFrameCount) this.frameCount = 0;\n    }\n\n    // If the player isn't standing still, then update 'front' status\n    if (this.movingTo !== 0) this.facingFront = this.movingTo > 0;\n\n    // Update this for checks done during the next step\n    this.wasMoving = this.movingTo;\n  }\n\n  handleMovement(timeStep, state) {\n    const xVel = this.vel.x;\n    const xMoveTo = this.pos.plus(new Vector(xVel * timeStep, 0));\n    if (!state.level.touches(xMoveTo, this.size, \"wall\") && !state.level.touches(xMoveTo, this.size, \"tile\") ) {\n      this.pos = xMoveTo;\n    }\n\n    let yVel = this.vel.y + timeStep * CONSTANTS.GRAVITY;\n    const yMoveTo = this.pos.plus(new Vector(0, yVel * timeStep));\n    if (!state.level.touches(yMoveTo, this.size, \"wall\") && !state.level.touches(yMoveTo, this.size, \"tile\")) {\n      // jumping or falling\n      this.pos = yMoveTo;\n    } else if (yMoveTo.y > this.pos.y) {\n      // player is on the ground\n      yVel = 0;\n      this.jumping = false;\n    }\n\n    this.vel = new Vector(xVel, yVel);\n  }\n\n  step(timeStep, state) {\n    this.handleFrames();\n    this.handleMovement(timeStep, state);\n  }\n\n  selectSprite(ctx, coordinates, size, spritesImg) {\n    const width = CONSTANTS.TILE_SIZE * this.size.x;\n    const height = CONSTANTS.TILE_SIZE * this.size.y;\n\n    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);\n    // s is source, d is destination\n    const extraHeight = 3; // Otherwise Yoshi looks like he's floating!!!\n    const xOnScreen = 950/2 + 50*(this.pos.x - this.viewPortCenter.x);\n    const yOnScreen = 450/2 + 50*(this.pos.y - this.viewPortCenter.y) + extraHeight;\n\n    ctx.drawImage(spritesImg, \n      coordinates[0], coordinates[1], \n      size[0], size[1],\n      xOnScreen, yOnScreen,\n      width, height);\n  }\n\n  collided(hitbox) {\n  }\n\n  isHit(projectile) {\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nconst CONSTANTS = {\n  GAME_SIZE:[950, 450],\n  TILE_SIZE: 50,\n};\n\nconst SPRITE_POS = {\n  grass1: [98, 1],\n  dirt1: [98, 16]\n};\n\nconst SPRITE_SIZE = {\n  grass1: [44, 45],\n  dirt1: [44, 30]\n}\n\nclass Tile {\n  // pos is a Vector object!\n  // category is potentially used to differentiate tiles (visually)\n  // category is passed as char (ex: \"#\");\n  constructor(pos, char) {\n    this.pos = pos;\n    this.char = char;\n    this.sprites = new Image();\n    this.sprites.src = '../assets/sprites/pixel_1/terrain.png';\n  }\n\n  static create(pos, category) {\n    return new Tile(pos, category);\n  }\n\n  get type() {\n    return \"tile\";\n  }\n\n  get size() {\n    return new Vector(1, 1);\n  }\n\n  draw(ctx, viewPortCenter) {\n    const width = CONSTANTS.TILE_SIZE;\n    const height = CONSTANTS.TILE_SIZE;\n    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x);\n    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y);\n    if (this.char === \"#\") {\n      ctx.drawImage(this.sprites,\n        SPRITE_POS[\"grass1\"][0], SPRITE_POS[\"grass1\"][1],\n        SPRITE_SIZE[\"grass1\"][0], SPRITE_SIZE[\"grass1\"][1],\n        xOnScreen, yOnScreen,\n        CONSTANTS.TILE_SIZE, CONSTANTS.TILE_SIZE);\n    } else if (this.char === \"$\") {\n      ctx.drawImage(this.sprites,\n        SPRITE_POS[\"dirt1\"][0], SPRITE_POS[\"dirt1\"][1],\n        SPRITE_SIZE[\"dirt1\"][0], SPRITE_SIZE[\"dirt1\"][1],\n        xOnScreen, yOnScreen,\n        width, height);\n    }\n  }\n}\n\nmodule.exports = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Vector {\n  constructor(x, y) {\n    this.x = x; \n    this.y = y;\n  }\n\n  plus(other) {\n    return new Vector(this.x + other.x, this.y + other.y);\n  }\n\n  minus(other) {\n    return new Vector(this.x - other.x, this.y - other.y);\n  }\n\n  distanceFrom(other) {\n    return new Vector(Math.abs(this.x - other.x), Math.abs(this.y - other.y));\n  }\n  \n  times(factor) {\n    return new Vector(this.x * factor, this.y * factor);\n  }\n}\n\nmodule.exports = Vector;\n\n//# sourceURL=webpack:///./src/vector.js?");

/***/ })

/******/ });