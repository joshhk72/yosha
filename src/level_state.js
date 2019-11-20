class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.actors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }
}

module.exports = State;