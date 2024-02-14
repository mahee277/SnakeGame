const gameBoard = document.getElementById('game-board');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const scoreElement = document.getElementById('score');

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let intervalId;
let score = 0;

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      createFood();
      score++;
      scoreElement.textContent = 'Score: ' + score;
    } else {
      snake.pop(); // Remove the last segment of the snake only if food is not eaten
    }
  
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      gameOver();
    }
  }
  

function createFood() {
  food.x = Math.floor(Math.random() * 20);
  food.y = Math.floor(Math.random() * 20);
}

function render() {
  snakeElement.style.left = snake[0].x * 20 + 'px';
  snakeElement.style.top = snake[0].y * 20 + 'px';

  foodElement.style.left = food.x * 20 + 'px';
  foodElement.style.top = food.y * 20 + 'px';
}

function startGame() {
  intervalId = setInterval(() => {
    update();
    render();
  }, 100);
}

function gameOver() {
  clearInterval(intervalId);
  alert('Game Over! Your score is: ' + score);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (e.key === 'ArrowDown' && dy !== -1) {
    dx = 0;
    dy = 1;
  } else if (e.key === 'ArrowLeft' && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (e.key === 'ArrowRight' && dx !== -1) {
    dx = 1;
    dy = 0;
  }
});

startGame();
