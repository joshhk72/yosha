// credit to https://eloquentjavascript.net/16_game.html
// for both the code example and excellent writing
const Player = require('./player.js');

const levelChars = {
  "P": Player,
};

class Level {
  constructor(plan) {
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.actors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == "string") return type;

        this.actors.push(
          type.create(new Vector(x, y), ch));
        return "empty";
      });
    });
  }
}

module.exports = Level;