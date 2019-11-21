class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
    this.life = 5; // life is health, hp, etc.

    this.win = false;
    this.lose = false;
    
    // tiles don't need to be in state because they don't change (yet...)
  }

  static start(level) {
    return new State(level, level.actors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type === "player");
  }

  get door() {
    return this.actors.find(a => a.type === "door");
  }

  get enemies() {
    return this.actors.filter(a => a.type === "enemy");
  }

  get enemiesExist() {
    return this.actors.some(a => a.type === "enemy");
  }

  remove(actor) {
    this.actors = this.actors.filter(a => {
      const same = a === actor
      return !same;
    });
  }
}

module.exports = State;