const grid = document.getElementById('grid');
const startBtn = document.getElementById('start-btn');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const bgMusic = document.getElementById('bg-music');
const eatSound = document.getElementById('eat-sound');

const GRID_SIZE = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let highScore = 0;
let interval;

function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        grid.appendChild(cell);
    }
}

function draw() {
    // Bersihkan grid dari semua kelas
    document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('snake', 'snake-head', 'food'));

    // Tambahkan kelas untuk kepala ular
    const head = snake[0];
    const headIndex = head.y * GRID_SIZE + head.x;
    document.querySelectorAll('.grid-cell')[headIndex].classList.add('snake-head');

    // Tambahkan kelas untuk tubuh ular (selain kepala)
    snake.slice(1).forEach(segment => {
        const index = segment.y * GRID_SIZE + segment.x;
        document.querySelectorAll('.grid-cell')[index].classList.add('snake');
    });

    // Tambahkan kelas untuk makanan
    const foodIndex = food.y * GRID_SIZE + food.x;
    document.querySelectorAll('.grid-cell')[foodIndex].classList.add('food');
}


function moveSnake() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Wrap the snake if it goes out of bounds
    head.x = (head.x + GRID_SIZE) % GRID_SIZE;
    head.y = (head.y + GRID_SIZE) % GRID_SIZE;

    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
        }
        eatSound.currentTime = 0; // Restart suara
        eatSound.play(); // Mainkan efek suara makan
        placeFood();
    } else {
        snake.pop();
    }

    // Check collision with itself
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * GRID_SIZE);
    food.y = Math.floor(Math.random() * GRID_SIZE);

    // Ensure food doesn't appear on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

function gameOver() {
    clearInterval(interval);
    bgMusic.pause(); // Hentikan musik
    
    // SweetAlert2 untuk Game Over
    Swal.fire({
        title: 'yahaha kalah dek!',
        text: `Skor lu cuma: ${score}`,
        icon: 'error',  // Bisa diganti 'warning', 'info', 'success', dll
        confirmButtonText: 'Play Again',
    }).then(() => {
        resetGame(); // Reset game setelah pemain menekan 'Play Again'
    });
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 }; // Arah awal ular
    score = 0;
    scoreElement.textContent = score;
    placeFood();
    draw();
}

function startGame() {
    clearInterval(interval);
    resetGame();
    bgMusic.currentTime = 0; // Restart musik
    bgMusic.play(); // Mulai musik latar
    interval = setInterval(() => {
        moveSnake();
        draw();
    }, 200);
}

function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

// Initialize the game
createGrid();
placeFood();
draw();
document.addEventListener('keydown', handleKeydown);
startBtn.addEventListener('click', startGame);
