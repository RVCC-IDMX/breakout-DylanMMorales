// collision.js - Handles collision detection and response
// This file manages all collision-related logic in the game
import { DEFAULTS } from './constants.js';

export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  // Check for all collisions in the game
  checkCollisions() {
    if (!this.game.ball || !this.game.paddle) {
      return;
    }
    this.checkPaddleCollision();
    this.checkBrickCollisions();
  }

  // Check if ball collides with paddle
  checkPaddleCollision() {
    const ball = this.game.ball;
    const paddle = this.game.paddle;
    if (
      ball.position.y + ball.size >= paddle.position.y &&
      ball.position.y <= paddle.position.y + paddle.height &&
      ball.position.x + ball.size >= paddle.position.x &&
      ball.position.x <= paddle.position.x + paddle.width
    ) {
      ball.dy = -ball.dy;
    }
  }

  // Check if ball collides with any bricks
  checkBrickCollisions() {
    const ball = this.game.ball;

    this.game.bricks.forEach((brick) => {
      if (!brick.broken) {
        if (this.collidesWith(ball, brick)) {
          brick.break();
          this.game.addScore(DEFAULTS.POINTS_PER_BRICK);
          this.calculateBounceDirection(ball, brick);
        }
      }
    });
  }

  // Calculate how the ball should bounce after hitting a brick
  calculateBounceDirection(ball, brick) {
    const ballCenterX = ball.position.x + ball.size / 2;
    const ballCenterY = ball.position.y + ball.size / 2;

    const brickLeft = brick.position.x;
    const brickRight = brick.position.x + brick.width;
    const brickTop = brick.position.y;
    const brickBottom = brick.position.y + brick.height;

    const distanceLeft = Math.abs(ballCenterX - brickLeft);
    const distanceRight = Math.abs(ballCenterX - brickRight);
    const distanceTop = Math.abs(ballCenterY - brickTop);
    const distanceBottom = Math.abs(ballCenterY - brickBottom);

    const minDistance = Math.min(distanceLeft, distanceRight, distanceTop, distanceBottom);

    if (minDistance === distanceLeft || minDistance === distanceRight) {
      ball.dx = -ball.dx;
    } else {
      ball.dy = -ball.dy;
    }
  }

  // Helper method to detect collision between ball and brick
  collidesWith(ball, brick) {
    return (
      ball.position.x < brick.position.x + brick.width &&
      ball.position.x + ball.size > brick.position.x &&
      ball.position.y < brick.position.y + brick.height &&
      ball.position.y + ball.size > brick.position.y
    );
  }
}
