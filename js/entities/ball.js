// ball.js - Ball entity
// This file contains the Ball class that represents the bouncing ball

import { DEFAULTS } from '../constants.js';

export class Ball {
  constructor(game) {
    this.game = game;
    this.size = DEFAULTS.BALL_SIZE;
    this.speed = DEFAULTS.BALL_SPEED;

    this.reset();
  }

  update() {
    this.position.x += this.dx;
    this.position.y += this.dy;

    if (this.position.x < 0 || this.position.x + this.size > this.game.width) {
      this.dx = -this.dx;
    }

    if (this.position.y < 0) {
      this.dy = -this.dy;
    }

    if (this.position.y + this.size > this.game.height) {
      this.game.ballLost();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  collidesWith(object) {
    return (
      this.position.x < object.position.x + object.width &&
      this.position.x + this.size > object.position.x &&
      this.position.y < object.position.y + object.height &&
      this.position.y + this.size > object.position.y
    );
  }

  reset() {
    this.position = {
      x: this.game.width / 2,
      y: this.game.height - 60
    };
    this.dx = this.speed;
    this.dy = -this.speed;
  }
}