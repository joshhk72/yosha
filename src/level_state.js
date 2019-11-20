class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    // tiles don't need to be in state because they don't change (yet...)
  }

  static start(level) {
    return new State(level, level.actors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type === "player");
  }

  get enemies() {
    return this.actors.filter(a => a.type === "enemy");
  }

  remove(actor) {
    this.actors = this.actors.filter(a => {
      const same = a === actor
      return !same;
    });
  }
}

module.exports = State;