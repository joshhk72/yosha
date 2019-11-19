const Vector = require('./vector');

const CONSTANTS = {
  GAME_SIZE:[950, 450],
  TILE_SIZE: 50,
};

const SPRITE_POS = {
  grass1: [98, 1],
  dirt1: [98, 16]
};

const SPRITE_SIZE = {
  grass1: [44, 45],
  dirt1: [44, 30]
}

class Tile {
  // pos is a Vector object!
  // category is potentially used to differentiate tiles (visually)
  // category is passed as char (ex: "#");
  constructor(pos, char) {
    this.pos = pos;
    this.char = char;
    this.sprites = new Image();
    this.sprites.src = '../assets/sprites/pixel_1/terrain.png';
  }

  static create(pos, category) {
    return new Tile(pos, category);
  }

  get type() {
    return "tile";
  }

  get size() {
    return new Vector(1, 1);
  }

  draw(ctx, viewPortCenter) {
    const xOnScreen = 950 / 2 + 50 * (this.pos.x - viewPortCenter.x);
    const yOnScreen = 450 / 2 + 50 * (this.pos.y - viewPortCenter.y);
    if (this.char === "#") {
      ctx.drawImage(this.sprites,
        SPRITE_POS["grass1"][0], SPRITE_POS["grass1"][1],
        SPRITE_SIZE["grass1"][0], SPRITE_SIZE["grass1"][1],
        xOnScreen, yOnScreen,
        CONSTANTS.TILE_SIZE, CONSTANTS.TILE_SIZE);
    } else if (this.char === "$") {
      ctx.drawImage(this.sprites,
        SPRITE_POS["dirt1"][0], SPRITE_POS["dirt1"][1],
        SPRITE_SIZE["dirt1"][0], SPRITE_SIZE["dirt1"][1],
        xOnScreen, yOnScreen,
        CONSTANTS.TILE_SIZE, CONSTANTS.TILE_SIZE);
    }
  }
}

module.exports = Tile;