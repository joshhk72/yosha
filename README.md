# Yosha

![Yosha](/dist/assets/images/example.png)

Yosha is a 2D action game based on the popular Contra series. Players can control a Yoshi that can move, jump, and shoot enemies with eggs. There are various types of foes who will be looking to take down Yoshi, but hopefully Yoshi can emerge victorious and find his way home.

## Game Overview

There are two keyboard layouts for the game, viewable on the "How to play" screen at game start.

The objective of the game is to eliminate all enemies, then find and enter the portal, which is only visible when all enemies on the level are gone. But be careful not to lose all of your lives in the process!

Games are played on a level-by-level basis. There is a level selection screen where the player can make their choice of level. A campaign mode may be implemented in the future (once the developer has more confidence in creating fun levels!).

## Technologies

The game was created using mostly vanilla JavaScript and the Canvas API.

The [keymaster.js](https://github.com/madrobby/keymaster) library is used for key bindings.

## Implementation Overview

### Physics

The game uses a vector model to keep the physics consistent across all aspects of the game. Vectors can represent position, size and velocity, with each unit representing the width of a tile in the game. While the vector class has methods to simplify calculations for adding, subtracting, and finding distances, the basic implementation can be seen below:

```javascript
class Vector {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
  }
}
```

This implementation means that collisions can easily be checked by checking the position and size of the actors, while interactions with wall and floor tiles can be checked by seeing if the actor's current velocity will bring them into the floor or wall.

### Levels

Since the tile size is constant, levels can be created using string representations of the entire grid. For example, level 1 is shown here:

```
...........................................................
...........................................................
...........................................................
.......>...................................................
.....................F.....................................
............F.................................<............
..................######...................................
...@......#####...........##...............................
##########$$$$$...............####.....................D...
$$$$$$$$$$$$$$$###############$$$$#########################
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
```

The level is interpreted using a key. Each character in the level string can represent a type of actor as well as the direction that the actor is facing at the start of the level. The current key is as shown:

```javascript
const levelChars = {
  "@": Player,
  "#": Tile,
  "$": Tile,
  "D": Door,
  ".": "empty",
  "F": FatBird,
  "<": Bat,
  ">": Bat,
  "s": Slime,
  "S": Slime,
};
```

### Enemy Behavior

How the enemies behave around the player determines the meat-and-bones of the game. Currently, two of the enemies in the game (Fat Bird and Slime) only have a set range of motion (standing still and moving back and forth on a platform). The Bat, however, has a more interesting interaction with the player, moving back and forth once it has detected the player. Currently, the Bat's turning behavior is handled by the below code:

```javascript
  handleTurn(state) {
    if (!this.isMoving) return;
    if ((state.player.pos.x - this.pos.x > 7 && this.vel.x < 0) 
      || (state.player.pos.x - this.pos.x < -7 && this.vel.x > 0)) {
      this.vel.x = -this.vel.x
      this.tickCount = 0;
      this.frameCount = 0;
    }
  }
```

While the enemies always shoot their projectiles towards the player, they only start shooting once the player's viewport contains the enemy. Otherwise, it simply wouldn't be fair.

### Viewport

```javascript
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
```

The viewport is an important aspect of the game in that it must always *almost* center around the player. Of course, the player is around to move within the viewport without scrolling it as long as they are not nearing the end of the viewport. But the movement of the viewport is a device to determine what gets drawn on the canvas, which enemies activate their shooting patterns, and perhaps other cool implementations in the future.

Since everything is drawn on the canvas in relation to the viewport, an instance of the viewport vector (kept in absolute units from the (0,0) position of the level) must be passed to anything that is drawn. 


## Possible Future Implementations
* More enemies with different types of behavior. Maybe even bosses.
* Campaign mode with balanced but difficult levels.
* Terrain with different behavior (springs, lava, sand, etc).