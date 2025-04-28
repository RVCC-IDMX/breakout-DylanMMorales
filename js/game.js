// game.js - Main game controller
// Student Task: Implement the Game class for managing game state and main loop

import { Paddle } from './entities/paddle.js';
import { Ball } from './entities/ball.js';
import { Brick } from './entities/brick.js';
import { InputHandler } from './input-handler.js';
import { CollisionManager } from './collision.js';
import { UI } from './ui.js';
import { GAME_STATES, DEFAULTS, BRICK_CONFIG } from './constants.js';

export class Game {
  constructor(canvasId) {
    // Canvas setup
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // TODO: Initialize game state
    this.gameState = GAME_STATES.START;
    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.debugMessage = '';

    // TODO: Initialize empty arrays/objects for game entities
    this.paddle = null;
    this.ball = null;
    this.bricks = [];

    // Game systems are provided for you
    this.ui = new UI(this);
    this.collisionManager = new CollisionManager(this);
    this.input = new InputHandler(this);

    // TODO: Call the init() method to set up the game
    this.init();

    // Set up canvas scale (provided for you)
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };

    // Add window resize listener (provided for you)
    window.addEventListener('resize', () => {
      this.updateCanvasScale();
    });
  }

  // Initialize the game
  init() {
    this.createEntities();
    this.setupBricks();
    this.ui.showScreen(GAME_STATES.START);
  }


  // Create game entities
  createEntities() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
  }

  // Update canvas scale calculation (provided for you)
  updateCanvasScale() {
    this.canvasScale = {
      x: this.canvas.width / this.canvas.offsetWidth,
      y: this.canvas.height / this.canvas.offsetHeight
    };
  }

  // Set up brick layout
  setupBricks() {
    this.bricks = [];

    for (let row = 0; row < BRICK_CONFIG.ROWS; row++) {
      for (let col = 0; col < BRICK_CONFIG.COLUMNS; col++) {
        const x = BRICK_CONFIG.OFFSET_LEFT + col * (BRICK_CONFIG.WIDTH + BRICK_CONFIG.PADDING);
        const y = BRICK_CONFIG.OFFSET_TOP + row * (BRICK_CONFIG.HEIGHT + BRICK_CONFIG.PADDING);
        const color = BRICK_CONFIG.COLORS[row % BRICK_CONFIG.COLORS.length];
        this.bricks.push(new Brick(this, x, y, BRICK_CONFIG.WIDTH, BRICK_CONFIG.HEIGHT, color));
      }
    }
  }
  // Start the game
  startGame() {
    this.gameState = GAME_STATES.PLAYING;
    this.ui.showScreen(GAME_STATES.PLAYING);
    this.input.setPaddle(this.paddle);
    this.gameLoop();
  }

  // Restart the game
  restartGame() {
    // TODO: Restart the game
    this.gameState = GAME_STATES.START;
    this.score = 0;
    this.lives = DEFAULTS.LIVES;
    this.createEntities();
    this.setupBricks();
    this.input.setPaddle(this.paddle);
    this.ui.updateStats();
    this.ui.showScreen(GAME_STATES.PLAYING);
    this.gameLoop();
  }

  // Main game loop
  gameLoop() {
    if (this.gameState !== GAME_STATES.PLAYING) {
      return;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.paddle.update();
    this.ball.update();
    this.collisionManager.checkCollisions();
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.bricks.forEach((brick) => {
      if (!brick.broken) {
        brick.draw(this.ctx);
      }
    });
    if (this.bricks.every((brick) => brick.broken)) {
      this.win();
    }
    if (this.debugMessage) {
      this.ctx.fillStyle = 'red';
      this.ctx.font = '16px Arial';
      this.ctx.fillText(this.debugMessage, 10, 20);
    }
    requestAnimationFrame(() => this.gameLoop());
  }

  // Handle ball out of bounds
  ballLost() {
    this.lives--;
    this.ui.updateStats();
    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.ball.reset();
    }
  }
  // Handle game over
  gameOver() {
    this.gameState = GAME_STATES.GAMEOVER;
    this.ui.showScreen(GAME_STATES.GAMEOVER);
  }
  // Handle win
  win() {
    this.gameState = GAME_STATES.WIN;
    this.ui.showScreen(GAME_STATES.WIN);
  }

  // Add to score
  addScore(points) {
    this.score += points;
    this.ui.updateStats();
  }

  // Debug message helper (provided for you)
  debug(message) {
    this.debugMessage = message;
  }
}