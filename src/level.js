// credit to https://eloquentjavascript.net/16_game.html
// for both the code example and excellent writing
const Tile = require('./tile.js');
const Player = require('./player.js');
const Door = require('./door.js');
const Vector = require('./vector');
const State = require('./level_state');

// enemies here
const FatBird = require('./enemies/fat_bird');

const CONSTANTS = {
  DIM_X: 950,
  DIM_Y: 450,
  VIEWPORT_WIDTH: 19,
  VIEWPORT_HEIGHT: 9,
  VECT_TO_CENTER: new Vector(950/50/2, 450/50/2), // this is from the top left of the viewport
};

const levelChars = {
  "@": Player,
  "#": Tile,
  "$": Tile,
  "D": Door,
  ".": "empty",
  "F": FatBird,
};

class Level {
  constructor(plan) {
    this.doItOnce = false;
    this.background = new Image();
    this.background.src = '../assets/sprites/background.png';
    this.status = "playing";
    this.actors = [];
    this.tiles = [];
    this.playerCount = 0;
    
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type === "string") return type;
        if (type === Tile) {
          const newTile = type.create(new Vector(x, y), ch);
          this.tiles.push(newTile);
          return newTile; 
        }
        // It's either a tile, or an actor
        const newActor = type.create(new Vector(x, y), ch);
        if (newActor.type === "player") {
          this.player = newActor;
          this.playerCount += 1;
        }
        this.actors.push(
          newActor);
        return "empty";
      });
    });

    if (this.playerCount !== 1) throw new Error('Every level must have exactly one player!');
    this.scrollPlayerIntoView.bind(this)();

    // Bound functions
    this.inViewPort = this.inViewPort.bind(this);
    this.state = State.start(this);
  }

  step(timeStep) {
    if (!this.doItOnce) { // for bug-testing
      this.doItOnce = true;
      // console.log(this.tiles);
      // console.log(this.player);
      // console.log(this.viewPortCenter);
    }

    // Step for player, and move viewport sideways if needed

    this.state.actors.forEach(actor => {
      if (actor.type === "player") {
        this.player.step(timeStep, this.state);
        if (this.player.pos.x > this.viewPortCenter.x + 3) {
          this.viewPortCenter.x = this.player.pos.x - 3;
        } else if (this.player.pos.x < this.viewPortCenter.x - 3) {
          this.viewPortCenter.x = this.player.pos.x + 3;
        }
    
        if (this.player.pos.y > this.viewPortCenter.y + 2) {
          this.viewPortCenter.y = this.player.pos.y - 2;
        } else if (this.player.pos.y < this.viewPortCenter.y - 2) {
          this.viewPortCenter.y = this.player.pos.y + 2;
        }
        // if not a player

      } else if (actor.type === "egg") {
        actor.step(timeStep, this.state);

        let isOutside = actor.pos.x < 0 || actor.pos.x > this.width ||
          actor.pos.y < 0 - 3 || actor.pos.y > this.height + 3; // more generous with y bounds

        if (isOutside) {
          this.state.actors = this.state.actors.filter(a => {
            const same = a === actor
            console.log(same);
            return !same;
          });
        }

      } else {
        actor.step(timeStep, this.state);
      }
    })
  }

  draw(ctx) {
    ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    ctx.drawImage(this.background, 0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    // this function should draw the viewport!
    this.tiles.forEach(tile => {
      if (this.inViewPort(tile)) {
        tile.draw(ctx, this.viewPortCenter);
      };
    });

    this.state.actors.forEach(actor => {
      if (this.inViewPort(actor)) {
        actor.draw(ctx, this.viewPortCenter);
      };
    })
  }

  scrollPlayerIntoView() {
    this.viewPortCenter = this.player.pos.plus(new Vector(0, -1.5));
  }

  inViewPort(element) {
    const distance = this.viewPortCenter.distanceFrom(element.pos);
    return (
      distance.x < CONSTANTS.VIEWPORT_WIDTH / 2 + element.size.x 
      || distance.y > CONSTANTS.VIEWPORT_HEIGHT / 2 + element.size.y
    );
  }

  touches(pos, size, type) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        // Anything outside is treated as a wall, according to the source
        let isOutside = x < 0 || x >= this.width ||
          y < 0 || y >= this.height;
        let here = isOutside ? "wall" : this.rows[y][x].type;
        if (here === type) return true;
      }
    }
    return false;
  }
}

module.exports = Level;