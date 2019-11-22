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

  // this gets a unit vector first, then scales it to the factor (perfect for bullets)
  scale(factor) {
    const i = this.x / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    const j = this.y / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    return new Vector(i * factor, j * factor);
  }
}

module.exports = Vector;