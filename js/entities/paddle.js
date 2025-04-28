// paddle.js - Paddle entity
// This file contains the Paddle class that represents the player-controlled paddle

import { DEFAULTS } from '../constants.js';

export class Paddle {
  constructor(game) {
    this.game = game;
    this.width = DEFAULTS.PADDLE_WIDTH;
    this.height = DEFAULTS.PADDLE_HEIGHT;
    this.position = {
      x: (this.game.width - this.width) / 2,
      y: this.game.height - this.height - 10
    };
    this.speed = DEFAULTS.PADDLE_SPEED;
    this.dx = 0;
  }

  update() {
    this.position.x += this.dx;

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.game.width) {
      this.position.x = this.game.width - this.width;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.dx = -this.speed;
  }

  moveRight() {
    this.dx = this.speed;
  }

  stop() {
    this.dx = 0;
  }

  setPosition(x) {
    this.position.x = x - this.width / 2;

    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.width > this.game.width) {
      this.position.x = this.game.width - this.width;
    }
  }
}