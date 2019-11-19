class Vector {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  distanceFrom(other) {
    return new Vector(Math.abs(this.x - other.x), Math.abs(this.y - other.y));
  }
  
  times(factor) {
    return new Vector(this.x * factor, this.y * factor);
  }
}

module.exports = Vector;