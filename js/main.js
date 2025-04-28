import { Game } from './game.js';
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const winRestartButton = document.getElementById('winRestartButton');
const game = new Game('gameCanvas');
startButton.addEventListener('click', () => {
  game.startGame();
});
restartButton.addEventListener('click', () => {
  game.restartGame();
});
winRestartButton.addEventListener('click', () => {
  game.restartGame();
});
