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
  constructor(plan, music) {
    this.doItOnce = false;
    this.background = new Image();
    this.background.src = '../assets/sprites/background.png';
    this.music = music;
    this.music.loop = true;
    this.music.currentTime = 0;
    this.music.volume = 0.3;
    this.music.play();
    this.muted = false;
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

  mute() {
    this.music.pause();
    this.state.actors.forEach(actor => actor.mute());
  }

  unmute() {
    this.music.play();
    this.state.actors.forEach(actor => actor.unmute());
  }

  step(timeStep) {

    // Step for player
    this.state.actors.forEach(actor => {
      if (actor.type === "player") {
        this.state.player.step(timeStep, this.state);

        // move viewport if needed
        if (this.state.player.pos.x > this.viewPortCenter.x + 3) {
          this.viewPortCenter.x = this.state.player.pos.x - 3;
        } else if (this.player.pos.x < this.viewPortCenter.x - 3) {
          this.viewPortCenter.x = this.state.player.pos.x + 3;
        }
    
        if (this.state.player.pos.y > this.viewPortCenter.y + 2) {
          this.viewPortCenter.y = this.state.player.pos.y - 2;
        } else if (this.state.player.pos.y < this.viewPortCenter.y - 2) {
          this.viewPortCenter.y = this.state.player.pos.y + 2;
        }

        let hitOnce = false;

        // check if enemy hit player
        this.state.enemies.forEach(enemy => {
          if (!hitOnce && this.overlap(this.state.player, enemy) && !this.state.player.isHit) {
            const xDiff = this.state.player.pos.x - enemy.pos.x;
            const recoilVel = xDiff/Math.abs(xDiff) * 0.3;
            this.state.player.getHit(new Vector(recoilVel, 0.1), this.state);
            hitOnce = true;
          };
        });

      // For eggs
      } else if (actor.type === "egg") {
        actor.step(timeStep, this.state);

        // This will remove the eggs that go far out of bounds
        let isOutside = actor.pos.x < 0 || actor.pos.x > this.width ||
          actor.pos.y < 0 - 3 || actor.pos.y > this.height + 3; // more generous with y bounds

        if (isOutside) {
          this.state.remove(actor);
        } else {
          // Check collisions with existing enemies
          let hitOne = false;
          this.state.enemies.forEach(enemy => {
            if (!hitOne && this.overlap(actor, enemy) && !enemy.isHit) { 
              this.state.remove(actor)
              enemy.getHit();
              hitOne = true;
            };
          });
        }
      } else if (actor.type === "enemy") {
        actor.step(timeStep, this.state);
        if (actor.life === 0)  this.state.remove(actor); // they ded

        // non-egg or player actors
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

  overlap(actor1, actor2) {
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
      actor1.pos.x < actor2.pos.x + actor2.size.x &&
      actor1.pos.y + actor1.size.y > actor2.pos.y &&
      actor1.pos.y < actor2.pos.y + actor2.size.y;
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