const Vector = require('./vector');

const CONSTANTS = {
  GAME_SIZE:[950, 450],
  TILE_SIZE: 50,
  SPRITE_SIZE: [30, 30],
};

const SPRITE_POS = {
  grass1: [96, 0]
};

class Tile {
  // pos is a Vector object!
  // category is potentially used to differentiate tiles (visually)
  // category is passed as char (ex: "#");
  constructor(pos, category) {
    this.pos = pos;
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

    ctx.drawImage(this.sprites,
      SPRITE_POS["grass1"][0], SPRITE_POS["grass1"][1],
      CONSTANTS.SPRITE_SIZE[0], CONSTANTS.SPRITE_SIZE[1],
      xOnScreen, yOnScreen,
      CONSTANTS.TILE_SIZE, CONSTANTS.TILE_SIZE);
  }
}

module.exports = Tile;