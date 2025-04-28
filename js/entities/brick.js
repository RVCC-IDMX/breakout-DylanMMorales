// brick.js - Brick entity
// This file contains the Brick class that represents the breakable bricks

export class Brick {
  constructor(game, x, y, width, height, color) {
    this.game = game;
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.color = color;
    this.broken = false;
  }

  draw(ctx) {
    if (this.broken) {
      return;
    }

    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  break() {
    this.broken = true;
  }
}