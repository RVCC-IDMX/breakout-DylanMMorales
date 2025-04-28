// input-handler.js - Handles user input

import { KEYS, GAME_STATES } from './constants.js';

export class InputHandler {
  constructor(game) {
    this.game = game;
    this.paddle = null; // Will be set later in setPaddle method
    this.mouseControlActive = false;

    // Set up keyboard event listeners
    this.setupKeyboardControls();

    // Set up mouse/touch event listeners
    this.setupMouseControls();
  }

  // Set the paddle that this input handler controls
  setPaddle(paddle) {
    this.paddle = paddle;
    this.game.debug('Paddle reference updated');
  }

  // Set up keyboard controls
  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (this.game.gameState !== GAME_STATES.PLAYING || !this.paddle) {
        return;
      }

      // Left movement keys
      if (KEYS.LEFT.includes(e.key) || e.code === 'ArrowLeft') {
        this.paddle.moveLeft();
        this.game.debug(`Left key pressed: ${e.key}`);
      }
      // Right movement keys
      if (KEYS.RIGHT.includes(e.key) || e.code === 'ArrowRight') {
        this.paddle.moveRight();
        this.game.debug(`Right key pressed: ${e.key}`);
      }
    });

    document.addEventListener('keyup', (e) => {
      if (this.game.gameState !== GAME_STATES.PLAYING || !this.paddle) {
        return;
      }

      // Stop paddle when key is released
      if (KEYS.LEFT.includes(e.key) || KEYS.RIGHT.includes(e.key) ||
        e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        this.paddle.stop();
        this.game.debug(`Key released: ${e.key}`);
      }
    });
  }

  // Set up mouse/touch controls
  setupMouseControls() {
    const updatePaddleFromMouse = (e) => {
      if (this.game.gameState !== GAME_STATES.PLAYING || !this.paddle) {
        return;
      }

      // Get mouse position relative to canvas
      const rect = this.game.canvas.getBoundingClientRect();
      const scaleX = this.game.canvas.width / rect.width;
      const mouseX = (e.clientX - rect.left) * scaleX;

      // Set paddle position
      this.paddle.setPosition(mouseX);
      this.mouseControlActive = true;
      this.game.debug(`Mouse position: ${mouseX.toFixed(0)}`);
    };

    const handleTouch = (e) => {
      e.preventDefault(); // Prevent scrolling
      if (this.game.gameState !== GAME_STATES.PLAYING || !this.paddle) {
        return;
      }

      const touch = e.touches[0];
      const rect = this.game.canvas.getBoundingClientRect();
      const scaleX = this.game.canvas.width / rect.width;
      const touchX = (touch.clientX - rect.left) * scaleX;

      this.paddle.setPosition(touchX);
      this.game.debug(`Touch position: ${touchX.toFixed(0)}`);
    };

    // Add all event listeners
    this.game.canvas.addEventListener('mousemove', updatePaddleFromMouse);
    this.game.canvas.addEventListener('click', updatePaddleFromMouse);
    this.game.canvas.addEventListener('touchmove', handleTouch);
    this.game.canvas.addEventListener('touchstart', handleTouch);
  }
}