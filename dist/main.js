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

/***/ "./src/egg.js":
/*!********************!*\
  !*** ./src/egg.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nconst CONSTANTS = {\n  SPRITE_POS: [361, 226],\n  SPRITE_SIZE: [12, 13],\n  WIDTH: 25,\n  HEIGHT: 25,\n  GRAVITY: 0.29,\n};\n\nclass Egg {\n  constructor(pos, vel) {\n    this.pos = pos;\n    this.vel = vel;\n    this.sprites = new Image();\n    this.sprites.src = '../assets/sprites/back-yoshi.png';\n  }\n\n  get type() {\n    return \"egg\";\n  }\n\n  get size() {\n    return new Vector(0.5, 0.5);\n  }\n\n  handleMovement(timeStep, state) {\n    // movement for x-direction\n    const xVel = this.vel.x;\n    this.pos = this.pos.plus(new Vector(xVel * timeStep, 0));\n\n    // movement for y-direction\n    let yVel = this.vel.y + timeStep * CONSTANTS.GRAVITY;\n    this.pos = this.pos.plus(new Vector(0, yVel * timeStep));\n\n    // for eggs, xVel does not change\n    this.vel.y = yVel;\n  }\n\n  step(timeStep, state) {\n    this.handleMovement(timeStep);\n  }\n\n  draw(ctx, viewPortCenter) {\n    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x);\n    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y);\n    ctx.drawImage(this.sprites,\n      CONSTANTS.SPRITE_POS[0], CONSTANTS.SPRITE_POS[1],\n      CONSTANTS.SPRITE_SIZE[0], CONSTANTS.SPRITE_SIZE[1],\n      xOnScreen, yOnScreen,\n      CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n  }\n}\n\nmodule.exports = Egg;\n\n//# sourceURL=webpack:///./src/egg.js?");

/***/ }),

/***/ "./src/enemies/enemy.js":
/*!******************************!*\
  !*** ./src/enemies/enemy.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Enemy {\n  constructor(pos, vel) {\n    this.pos = pos;\n    this.vel = vel;\n    this.isHit = false; // for small invincibility frame upon being hit (as well as animation)\n    this.life = 1; // default, but enemies can have different amounts of lives\n    this.frameCount = 0;\n    this.tickCount = 0;\n    // maxFrames and ticksPerFrame may differ per enemy!\n  }\n  \n  get type() {\n    return \"enemy\";\n  }\n\n  getHit() {\n    this.tickCount = 0;\n    this.isHit = true;\n    // this.life is decremented in the below function, since the animation must happen first!\n  }\n\n  finishGettingHit() {\n    this.isHit = false;\n    this.life -= 1;\n    if (this.life < 0) this.life = 0; // Just in case there's a bug LOL.\n  }\n\n  step(timeStep, state) {\n    this.handleFrames();\n    this.handleMovement(timeStep, state);\n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemies/enemy.js?");

/***/ }),

/***/ "./src/enemies/fat_bird.js":
/*!*********************************!*\
  !*** ./src/enemies/fat_bird.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ../vector */ \"./src/vector.js\");\n\nconst CONSTANTS = {\n  WIDTH: 50,\n  HEIGHT: 70,\n  TILE_SIZE: 50,\n  TICKS_PER_FRAME: 6,\n  MAX_FRAME_COUNT: 7,\n};\n\nconst SPRITE_POS = {\n  idle1: [2, 5],\n  idle2: [42, 4],\n  idle3: [84, 3],\n  idle4: [124, 3],\n  idle5: [161, 7],\n  idle6: [201, 8],\n  idle7: [241, 8],\n  idle8: [281, 7],\n  hit1: [0, 10],\n  hit2: [40, 10],\n  hit3: [81, 8],\n  hit4: [122, 6],\n  hit5: [162, 5],\n};\n\nconst SPRITE_SIZE = {\n  idle1: [35, 39],\n  idle2: [35, 42],\n  idle3: [31, 45],\n  idle4: [31, 45],\n  idle5: [37, 35],\n  idle6: [37, 32],\n  idle7: [37, 32],\n  idle8: [37, 35],\n  hit1: [39, 31],\n  hit2: [39, 31],\n  hit3: [37, 34],\n  hit4: [35, 37],\n  hit5: [35, 39],\n};\n\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemies/enemy.js\");\n\nclass FatBird extends Enemy {\n  constructor(pos) {\n    super(pos);\n    this.idleSprites = new Image();\n    this.hitSprites = new Image();\n    this.idleSprites.src = '../assets/sprites/pixel/enemies/FatBird/Idle (40x48).png';\n    this.hitSprites.src = '../assets/sprites/pixel/enemies/FatBird/Hit (40x48).png';\n\n    this.life = 2;\n\n    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;\n    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;\n  }\n\n  static create(pos) {\n    return new FatBird(pos);\n  }\n\n  get size() {\n    // fat bird is one tile size!\n    return new Vector(1, 1);\n  }\n\n  handleFrames() {\n    this.tickCount += 1;\n\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n      this.frameCount += 1;\n      if (this.frameCount === this.maxFrameCount) {\n        this.frameCount = 0;\n        if (this.isHit) this.finishGettingHit();\n      }\n    }\n  }\n\n  // The fat bird is a useless enemy, so no movement needs to be handled!\n  step() {\n    this.handleFrames();\n    // this.handleMovement();\n  }\n\n  draw(ctx, viewPortCenter) {\n    this.viewPortCenter = viewPortCenter;\n\n    if (!this.isHit) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, SPRITE_POS['idle1'], SPRITE_SIZE['idle1'], this.idleSprites);\n        case 1:\n          return this.selectSprite(ctx, SPRITE_POS['idle2'], SPRITE_SIZE['idle2'], this.idleSprites);\n        case 2:\n          return this.selectSprite(ctx, SPRITE_POS['idle3'], SPRITE_SIZE['idle3'], this.idleSprites);\n        case 3:\n          return this.selectSprite(ctx, SPRITE_POS['idle4'], SPRITE_SIZE['idle4'], this.idleSprites);\n        case 4:\n          return this.selectSprite(ctx, SPRITE_POS['idle5'], SPRITE_SIZE['idle5'], this.idleSprites);\n        case 5:\n          return this.selectSprite(ctx, SPRITE_POS['idle6'], SPRITE_SIZE['idle6'], this.idleSprites);\n        case 6:\n          return this.selectSprite(ctx, SPRITE_POS['idle7'], SPRITE_SIZE['idle7'], this.idleSprites);\n        case 7:\n          return this.selectSprite(ctx, SPRITE_POS['idle8'], SPRITE_SIZE['idle8'], this.idleSprites);\n      }\n    } else {\n      switch (this.frameCount) {\n        case  false || 5:\n          return this.selectSprite(ctx, SPRITE_POS['hit1'], SPRITE_SIZE['hit1'], this.hitSprites);\n        case 1 || false:\n          return this.selectSprite(ctx, SPRITE_POS['hit2'], SPRITE_SIZE['hit2'], this.hitSprites);\n        case 2 || false:\n          return this.selectSprite(ctx, SPRITE_POS['hit3'], SPRITE_SIZE['hit3'], this.hitSprites);\n        case 3:\n          return this.selectSprite(ctx, SPRITE_POS['hit4'], SPRITE_SIZE['hit4'], this.hitSprites);\n        case 4:\n          return this.selectSprite(ctx, SPRITE_POS['hit5'], SPRITE_SIZE['hit5'], this.hitSprites);\n      }\n    }\n  }\n\n\n  selectSprite(ctx, coordinates, size, spritesImg) {\n    // [35, 235] is taken as the default sprite size for fat bird (tis just an estimate...)\n    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 35;\n    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 35;\n\n    const extraHeight = -3;\n    // Hopefully the extraHeight doesn't make hitboxes deceptive!\n    const xOnScreen = 950 / 2 + 50 * (this.pos.x - this.viewPortCenter.x);\n    const yOnScreen = 450 / 2 + 50 * (this.pos.y - this.viewPortCenter.y) + extraHeight;\n\n    ctx.drawImage(spritesImg,\n      coordinates[0], coordinates[1],\n      size[0], size[1],\n      xOnScreen, yOnScreen,\n      width, height);\n  }\n};\n\nmodule.exports = FatBird;\n\n//# sourceURL=webpack:///./src/enemies/fat_bird.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("//const Game = require(\"./game.js\");\nconst Level = __webpack_require__(/*! ./level.js */ \"./src/level.js\");\nconst GAME_LEVELS = __webpack_require__(/*! ./levels */ \"./src/levels.js\");\n\nconst CONSTANTS = {\n  TIME: 0.1\n};\n\nclass GameView {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.currentLevel = new Level(GAME_LEVELS[0]);\n    this.started = false;\n    this.over = false;\n    this.paused = false;\n    this.render = this.render.bind(this);\n    this.step = this.step.bind(this);\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.render();\n  }\n\n  step() {\n    if ((!key.isPressed('left') && !key.isPressed('right')) || (key.isPressed('left') && key.isPressed('right'))) {\n      this.currentLevel.player.moveTo(0);\n    }\n    if ((!key.isPressed('up') && !key.isPressed('down')) || (key.isPressed('up') && key.isPressed('down'))) {\n      this.currentLevel.player.lookVertically(0);\n    }\n    // this.game.step();\n    this.currentLevel.step(CONSTANTS.TIME);\n    this.currentLevel.draw(this.ctx);\n  }\n\n  render() {\n    if (!this.over && !this.paused) {\n      requestAnimationFrame(this.render);\n      this.step();\n    }\n  }\n\n  bindKeyHandlers() {\n    key('left', () => { this.currentLevel.player.moveTo(-1) });\n    key('right', () => { this.currentLevel.player.moveTo(1) });\n    key('up', () => { this.currentLevel.player.lookVertically(1) });\n    key('down', () => { this.currentLevel.player.lookVertically(-1) });\n    key('z', () => { this.currentLevel.player.jump() });\n    key('x', () => { \n      if (!key.isPressed(\"up\")) {\n        this.currentLevel.player.shoot(this.currentLevel.state);\n      } else {\n        this.currentLevel.player.shootUp(this.currentLevel.state);\n      }\n    });\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

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

eval("// credit to https://eloquentjavascript.net/16_game.html\n// for both the code example and excellent writing\nconst Tile = __webpack_require__(/*! ./tile.js */ \"./src/tile.js\");\nconst Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst Door = __webpack_require__(/*! ./door.js */ \"./src/door.js\");\nconst Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\nconst State = __webpack_require__(/*! ./level_state */ \"./src/level_state.js\");\n\n// enemies here\nconst FatBird = __webpack_require__(/*! ./enemies/fat_bird */ \"./src/enemies/fat_bird.js\");\n\nconst CONSTANTS = {\n  DIM_X: 950,\n  DIM_Y: 450,\n  VIEWPORT_WIDTH: 19,\n  VIEWPORT_HEIGHT: 9,\n  VECT_TO_CENTER: new Vector(950/50/2, 450/50/2), // this is from the top left of the viewport\n};\n\nconst levelChars = {\n  \"@\": Player,\n  \"#\": Tile,\n  \"$\": Tile,\n  \"D\": Door,\n  \".\": \"empty\",\n  \"F\": FatBird,\n};\n\nclass Level {\n  constructor(plan) {\n    this.doItOnce = false;\n    this.background = new Image();\n    this.background.src = '../assets/sprites/background.png';\n    this.status = \"playing\";\n    this.actors = [];\n    this.tiles = [];\n    this.playerCount = 0;\n    \n    let rows = plan.trim().split(\"\\n\").map(l => [...l]);\n    this.height = rows.length;\n    this.width = rows[0].length;\n\n    this.rows = rows.map((row, y) => {\n      return row.map((ch, x) => {\n        let type = levelChars[ch];\n        if (typeof type === \"string\") return type;\n        if (type === Tile) {\n          const newTile = type.create(new Vector(x, y), ch);\n          this.tiles.push(newTile);\n          return newTile; \n        }\n        // It's either a tile, or an actor\n        const newActor = type.create(new Vector(x, y), ch);\n        if (newActor.type === \"player\") {\n          this.player = newActor;\n          this.playerCount += 1;\n        }\n        this.actors.push(\n          newActor);\n        return \"empty\";\n      });\n    });\n\n    if (this.playerCount !== 1) throw new Error('Every level must have exactly one player!');\n    this.scrollPlayerIntoView.bind(this)();\n\n    // Bound functions\n    this.inViewPort = this.inViewPort.bind(this);\n    this.state = State.start(this);\n  }\n\n  step(timeStep) {\n    if (!this.doItOnce) { // for bug-testing\n      this.doItOnce = true;\n      // console.log(this.tiles);\n      // console.log(this.player);\n      // console.log(this.viewPortCenter);\n    }\n\n    // Step for player, and move viewport sideways if needed\n    this.state.actors.forEach(actor => {\n      if (actor.type === \"player\") {\n        this.player.step(timeStep, this.state);\n        if (this.player.pos.x > this.viewPortCenter.x + 3) {\n          this.viewPortCenter.x = this.player.pos.x - 3;\n        } else if (this.player.pos.x < this.viewPortCenter.x - 3) {\n          this.viewPortCenter.x = this.player.pos.x + 3;\n        }\n    \n        if (this.player.pos.y > this.viewPortCenter.y + 2) {\n          this.viewPortCenter.y = this.player.pos.y - 2;\n        } else if (this.player.pos.y < this.viewPortCenter.y - 2) {\n          this.viewPortCenter.y = this.player.pos.y + 2;\n        }\n        // if not a player\n\n      // For eggs\n      } else if (actor.type === \"egg\") {\n        actor.step(timeStep, this.state);\n\n        // This will remove the eggs that go far out of bounds\n        let isOutside = actor.pos.x < 0 || actor.pos.x > this.width ||\n          actor.pos.y < 0 - 3 || actor.pos.y > this.height + 3; // more generous with y bounds\n\n        if (isOutside) {\n          this.state.remove(actor);\n        } else {\n          // Check collisions with existing enemies\n          let hitOne = false;\n          this.state.enemies.forEach(enemy => {\n            if (!hitOne && this.overlap(actor, enemy) && !enemy.isHit) { \n              this.state.remove(actor)\n              enemy.getHit();\n              hitOne = true;\n            };\n          });\n        }\n      } else if (actor.type === \"enemy\") {\n        actor.step(timeStep, this.state);\n        if (actor.life === 0)  this.state.remove(actor); // they ded\n\n        // non-egg or player actors\n      } else {\n        actor.step(timeStep, this.state);\n      }\n    })\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    ctx.drawImage(this.background, 0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    // this function should draw the viewport!\n    this.tiles.forEach(tile => {\n      if (this.inViewPort(tile)) {\n        tile.draw(ctx, this.viewPortCenter);\n      };\n    });\n\n    this.state.actors.forEach(actor => {\n      if (this.inViewPort(actor)) {\n        actor.draw(ctx, this.viewPortCenter);\n      };\n    })\n  }\n\n  scrollPlayerIntoView() {\n    this.viewPortCenter = this.player.pos.plus(new Vector(0, -1.5));\n  }\n\n  inViewPort(element) {\n    const distance = this.viewPortCenter.distanceFrom(element.pos);\n    return (\n      distance.x < CONSTANTS.VIEWPORT_WIDTH / 2 + element.size.x \n      || distance.y > CONSTANTS.VIEWPORT_HEIGHT / 2 + element.size.y\n    );\n  }\n\n  overlap(actor1, actor2) {\n    return actor1.pos.x + actor1.size.x > actor2.pos.x &&\n      actor1.pos.x < actor2.pos.x + actor2.size.x &&\n      actor1.pos.y + actor1.size.y > actor2.pos.y &&\n      actor1.pos.y < actor2.pos.y + actor2.size.y;\n  }\n\n  touches(pos, size, type) {\n    const xStart = Math.floor(pos.x);\n    const xEnd = Math.ceil(pos.x + size.x);\n    const yStart = Math.floor(pos.y);\n    const yEnd = Math.ceil(pos.y + size.y);\n\n    for (let y = yStart; y < yEnd; y++) {\n      for (let x = xStart; x < xEnd; x++) {\n        // Anything outside is treated as a wall, according to the source\n        let isOutside = x < 0 || x >= this.width ||\n          y < 0 || y >= this.height;\n        let here = isOutside ? \"wall\" : this.rows[y][x].type;\n        if (here === type) return true;\n      }\n    }\n    return false;\n  }\n}\n\nmodule.exports = Level;\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/level_state.js":
/*!****************************!*\
  !*** ./src/level_state.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class State {\n  constructor(level, actors, status) {\n    this.level = level;\n    this.actors = actors;\n    this.status = status;\n    // tiles don't need to be in state because they don't change (yet...)\n  }\n\n  static start(level) {\n    return new State(level, level.actors, \"playing\");\n  }\n\n  get player() {\n    return this.actors.find(a => a.type === \"player\");\n  }\n\n  get enemies() {\n    return this.actors.filter(a => a.type === \"enemy\");\n  }\n\n  remove(actor) {\n    this.actors = this.actors.filter(a => {\n      const same = a === actor\n      return !same;\n    });\n  }\n}\n\nmodule.exports = State;\n\n//# sourceURL=webpack:///./src/level_state.js?");

/***/ }),

/***/ "./src/levels.js":
/*!***********************!*\
  !*** ./src/levels.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const GAME_LEVELS = [`\n...........................................................\n...........................................................\n...........................................................\n...........................................................\n.....................F.....................................\n............F..............................................\n..................######...................................\n...@......#####............................................\n##########$$$$$...............####.....................D...\n$$$$$$$$$$$$$$$###############$$$$#########################\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n`\n]\n\nmodule.exports = GAME_LEVELS;\n\n//# sourceURL=webpack:///./src/levels.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\nconst Egg = __webpack_require__(/*! ./egg */ \"./src/egg.js\");\n\n// each tile on the map is going to be 50 x 50\n// this makes the player size 1 x 1.4 tiles\nconst CONSTANTS = {\n  WIDTH: 50,\n  HEIGHT: 70,\n  TILE_SIZE: 50,\n  TICKS_PER_FRAME: 6,\n  GRAVITY: 0.29,\n  X_SPEED: 0.4,\n  JUMP_SPEED: 1.1,\n  STARTING_VEL: new Vector(0, 0),\n  RELOAD_TIME: 250, // in milliseconds\n  MAX_FRAME_COUNT: 7,\n};\n\nconst FRONT_SPRITE_POS = {\n  walk1: [699, 4],\n  walk2: [681, 4],\n  walk3: [664, 4],\n  walk4: [647, 4],\n  walk5: [630, 4],\n  walk6: [613, 5],\n  walk7: [596, 4],\n  walk8: [579, 4],\n  shoot1: [552, 5],\n  shoot2: [533, 4],\n  shoot3: [510, 4],\n  shoot4: [486, 4],\n  shoot5: [462, 4],\n  shoot6: [440, 4],\n  shoot7: [422, 6],\n  shoot8: [400, 4],\n  stand: [719, 4],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst BACK_SPRITE_POS = {\n  lookUp: [525, 4],\n  walk1: [142, 4],\n  walk2: [125, 4],\n  walk3: [108, 5],\n  walk4: [91, 4],\n  walk5: [74, 4],\n  walk6: [57, 4],\n  walk7: [40, 4],\n  walk8: [22, 4],\n  shoot1: [167, 5],\n  shoot2: [187, 4],\n  shoot3: [207, 4],\n  shoot4: [229, 4],\n  shoot5: [253, 4],\n  shoot6: [277, 4],\n  shoot7: [299, 6],\n  shoot8: [318, 4],\n  stand: [2, 4],\n  jump1: [278, 3],\n  jump2: [295, 3],\n  fall: [9, 3]\n};\n\nconst SPRITE_SIZE = {\n  lookUp: [15, 25],\n  walk: [15, 25],\n  stand: [15, 25],\n  jump1: [17, 26],\n  jump2: [19, 26],\n  fall: [21, 26],\n  shoot1: [17, 24],\n  shoot2: [16, 25],\n  shoot3: [19, 25],\n  shoot4: [21, 25],\n  shoot5: [21, 25],\n  shoot6: [19, 25],\n  shoot7: [15, 23],\n  shoot8: [18, 25],\n};\n\n\nclass Player {\n  constructor(pos) {\n    this.pos = pos.minus(new Vector(0, 0.333)); // offset needed because character is taller than single tile\n    this.vel = CONSTANTS.STARTING_VEL;\n    this.frontSprites = new Image();\n    this.backSprites = new Image();\n    this.frontSprites.src = '../assets/sprites/yoshi.png';\n    this.backSprites.src = '../assets/sprites/back-yoshi.png';\n    \n    this.facingFront = true; // facing front at the start\n    this.movingTo = 0;\n    this.wasMoving = 0;\n    this.verticalPerspective = 0;\n    this.jumping = false;\n    this.onGround = false;\n\n    this.reloading = false; // this is for 'throttling' shooting of eggs\n    this.shooting = false;\n    this.shootingUp = false; // these two are differentiated so that animations can be differentiated\n    \n    // http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/\n    this.frameCount = 0;\n    this.maxFrameCount = CONSTANTS.MAX_FRAME_COUNT;\n    this.tickCount = 0;\n    this.ticksPerFrame = CONSTANTS.TICKS_PER_FRAME;\n\n    this.handleFrames = this.handleFrames.bind(this);\n    this.handleMovement = this.handleMovement.bind(this);\n  }\n\n  static create(pos) {\n    return new Player(pos);\n  }\n\n  get type() {\n    return \"player\";\n  }\n\n  get size() {\n    return new Vector(0.8, 1.333);\n  }\n\n  // moveTo determines x-direction movement\n  moveTo(num) {\n    this.movingTo = num;\n    switch (num) {\n      case 1:\n        this.vel.x = CONSTANTS.X_SPEED;\n        break;\n      case -1:\n        this.vel.x = -CONSTANTS.X_SPEED;\n        break;\n      case 0:\n        this.vel.x = 0;\n        break;\n    }\n  }\n\n  lookVertically(num) {\n    this.verticalPerspective = num;\n  }\n\n  jump() {\n    if (!this.jumping && this.onGround) {\n      this.vel.y = -CONSTANTS.JUMP_SPEED;\n      this.jumping = true;\n    }\n  }\n\n  shoot(state) {\n    if (!this.reloading && !this.shooting && !this.shootingUp) {\n      this.tickCount = 0;\n      this.shooting = true;\n      this.reloading = true;\n      let newEgg;\n      if (this.facingFront) {\n        newEgg = new Egg(this.pos, new Vector(0.7 + this.vel.x / 2, -1));\n      } else {\n        newEgg = new Egg(this.pos, new Vector(-0.7 + this.vel.x / 2, -1));\n      }\n      state.actors.push(newEgg);\n    }\n  }\n\n  shootUp(state) {\n    if (!this.reloading && !this.shooting && !this.shootingUp) {\n      this.tickCount = 0;\n      this.shootingUp = true;\n      this.reloading = true;\n      // shooting straight up\n      const newEgg = new Egg(this.pos, new Vector(0, -1.8));\n      state.actors.push(newEgg);\n    }\n  }\n\n  draw(ctx, viewPortCenter) {\n    this.viewPortCenter = viewPortCenter;\n\n    if (this.shooting && this.facingFront) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot1'], SPRITE_SIZE['shoot1'], this.frontSprites);\n        case 1:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot2'], SPRITE_SIZE['shoot2'], this.frontSprites);\n        case 2:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot3'], SPRITE_SIZE['shoot3'], this.frontSprites);\n        case 3:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot4'], SPRITE_SIZE['shoot4'], this.frontSprites);\n        case 4:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot5'], SPRITE_SIZE['shoot5'], this.frontSprites);\n        case 5:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot6'], SPRITE_SIZE['shoot6'], this.frontSprites);\n        case 6:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot7'], SPRITE_SIZE['shoot7'], this.frontSprites);\n        case 7:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['shoot8'], SPRITE_SIZE['shoot8'], this.frontSprites);\n      }\n    } else if (this.shooting && !this.facingFront) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot1'], SPRITE_SIZE['shoot1'], this.backSprites);\n        case 1:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot2'], SPRITE_SIZE['shoot2'], this.backSprites);\n        case 2:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot3'], SPRITE_SIZE['shoot3'], this.backSprites);\n        case 3:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot4'], SPRITE_SIZE['shoot4'], this.backSprites);\n        case 4:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot5'], SPRITE_SIZE['shoot5'], this.backSprites);\n        case 5:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot6'], SPRITE_SIZE['shoot6'], this.backSprites);\n        case 6:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot7'], SPRITE_SIZE['shoot7'], this.backSprites);\n        case 7:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['shoot8'], SPRITE_SIZE['shoot8'], this.backSprites);\n      }\n    }\n\n    if (this.verticalPerspective > 0) {\n      this.selectSprite(ctx, BACK_SPRITE_POS['lookUp'], SPRITE_SIZE['lookUp'], this.backSprites);\n    } else if (this.movingTo === 0) {\n      return this.facingFront ? this.selectSprite(ctx, FRONT_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.frontSprites)\n        : this.selectSprite(ctx, BACK_SPRITE_POS['stand'], SPRITE_SIZE['stand'], this.backSprites);\n    } else if (this.movingTo > 0) {\n      switch(this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 1:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 2:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 3:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 4:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 5:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 6:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.frontSprites);\n        case 7:\n          return this.selectSprite(ctx, FRONT_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.frontSprites);\n      }\n    } else if (this.movingTo < 0) {\n      switch (this.frameCount) {\n        case 0:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk1'], SPRITE_SIZE['walk'], this.backSprites);\n        case 1:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk2'], SPRITE_SIZE['walk'], this.backSprites);\n        case 2:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk3'], SPRITE_SIZE['walk'], this.backSprites);\n        case 3:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk4'], SPRITE_SIZE['walk'], this.backSprites);\n        case 4:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk5'], SPRITE_SIZE['walk'], this.backSprites);\n        case 5:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk6'], SPRITE_SIZE['walk'], this.backSprites);\n        case 6:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk7'], SPRITE_SIZE['walk'], this.backSprites);\n        case 7:\n          return this.selectSprite(ctx, BACK_SPRITE_POS['walk8'], SPRITE_SIZE['walk'], this.backSprites);\n        }\n    }\n  }\n\n  handleFrames() {\n    // Increment ticks if continuously moving\n    if (this.shooting) {\n      this.tickCount += 1;\n    } else if (this.shootingUp) {\n      this.tickCount += 1;\n    } else if (this.movingTo !== 0) {\n      if (this.wasMoving === this.movingTo) {\n        this.tickCount += 1;\n      } else {\n        this.tickCount = 0;\n        this.frameCount = 0;\n      }\n    } else { // just in case ticks & frames are used for something else than walking!\n      this.tickCount = 0;\n      this.frameCount = 0;\n    }\n\n    // Increment frames if enough ticks are reached on the same action\n    if (this.tickCount > this.ticksPerFrame) {\n      this.tickCount = 0;\n      this.frameCount += 1;\n      if (this.frameCount === this.maxFrameCount) {\n        this.frameCount = 0;\n        this.shooting = false;\n        this.shootingUp = false;\n        setTimeout(() => {\n          if (this.reloading === true) this.reloading = false;\n        }, CONSTANTS.RELOAD_TIME);\n      }\n    }\n\n    // If the player isn't standing still, then update 'front' status\n    if (this.movingTo !== 0) this.facingFront = this.movingTo > 0;\n\n    // Update this for checks done during the next step\n    this.wasMoving = this.movingTo;\n  }\n\n  handleMovement(timeStep, state) {\n    const xVel = this.vel.x;\n    const xMoveTo = this.pos.plus(new Vector(xVel * timeStep, 0));\n    if (!state.level.touches(xMoveTo, this.size, \"wall\") && !state.level.touches(xMoveTo, this.size, \"tile\") ) {\n      this.pos = xMoveTo;\n    }\n\n    let yVel = this.vel.y + timeStep * CONSTANTS.GRAVITY;\n    const yMoveTo = this.pos.plus(new Vector(0, yVel * timeStep));\n    if (!state.level.touches(yMoveTo, this.size, \"wall\") && !state.level.touches(yMoveTo, this.size, \"tile\")) {\n      // jumping or falling\n      this.onGround = false;\n      this.pos = yMoveTo;\n    } else if (yMoveTo.y > this.pos.y) {\n      // player is on the ground\n      yVel = 0;\n      this.jumping = false;\n      this.onGround = true;\n    }\n\n    this.vel = new Vector(xVel, yVel);\n  }\n\n  step(timeStep, state) {\n    this.handleFrames();\n    this.handleMovement(timeStep, state);\n  }\n\n  selectSprite(ctx, coordinates, size, spritesImg) {\n    // [15, 25] is taken as the default sprite size\n    const width = CONSTANTS.TILE_SIZE * this.size.x * size[0] / 15;\n    const height = CONSTANTS.TILE_SIZE * this.size.y * size[1] / 25;\n\n    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);\n    // s is source, d is destination\n    const extraHeight = 3; // Otherwise Yoshi looks like he's floating!!!\n    const xOnScreen = 950/2 + 50*(this.pos.x - this.viewPortCenter.x);\n    const yOnScreen = 450/2 + 50*(this.pos.y - this.viewPortCenter.y) + extraHeight;\n\n    ctx.drawImage(spritesImg, \n      coordinates[0], coordinates[1], \n      size[0], size[1],\n      xOnScreen, yOnScreen,\n      width, height);\n  }\n\n  collided(hitbox) {\n  }\n\n  isHit(projectile) {\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Vector = __webpack_require__(/*! ./vector */ \"./src/vector.js\");\n\nconst CONSTANTS = {\n  GAME_SIZE:[950, 450],\n  TILE_SIZE: 50,\n};\n\nconst SPRITE_POS = {\n  grass1: [98, 1],\n  dirt1: [98, 16]\n};\n\nconst SPRITE_SIZE = {\n  grass1: [44, 45],\n  dirt1: [44, 30]\n}\n\nclass Tile {\n  // pos is a Vector object!\n  // category is potentially used to differentiate tiles (visually)\n  // category is passed as char (ex: \"#\");\n  constructor(pos, char) {\n    this.pos = pos;\n    this.char = char;\n    this.sprites = new Image();\n    this.sprites.src = '../assets/sprites/pixel/terrain.png';\n  }\n\n  static create(pos, category) {\n    return new Tile(pos, category);\n  }\n\n  get type() {\n    return \"tile\";\n  }\n\n  get size() {\n    return new Vector(1, 1);\n  }\n\n  draw(ctx, viewPortCenter) {\n    const width = CONSTANTS.TILE_SIZE;\n    const height = CONSTANTS.TILE_SIZE;\n    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x);\n    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y);\n    if (this.char === \"#\") {\n      ctx.drawImage(this.sprites,\n        SPRITE_POS[\"grass1\"][0], SPRITE_POS[\"grass1\"][1],\n        SPRITE_SIZE[\"grass1\"][0], SPRITE_SIZE[\"grass1\"][1],\n        xOnScreen, yOnScreen,\n        CONSTANTS.TILE_SIZE, CONSTANTS.TILE_SIZE);\n    } else if (this.char === \"$\") {\n      ctx.drawImage(this.sprites,\n        SPRITE_POS[\"dirt1\"][0], SPRITE_POS[\"dirt1\"][1],\n        SPRITE_SIZE[\"dirt1\"][0], SPRITE_SIZE[\"dirt1\"][1],\n        xOnScreen, yOnScreen,\n        width, height);\n    }\n  }\n}\n\nmodule.exports = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

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