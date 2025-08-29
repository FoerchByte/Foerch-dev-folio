/*
  EN: This module contains all the logic for the Snake Game. It is a great example of
  a project built with pure JavaScript, showcasing game loop implementation,
  collision detection, and score management. It also includes touch controls
  for mobile devices.
  PL: Ten moduł zawiera całą logikę dla gry w węża. Jest to doskonały przykład
  projektu zbudowanego w czystym JavaScript, demonstrujący implementację pętli gry,
  wykrywanie kolizji i zarządzanie wynikiem. Zawiera również sterowanie dotykowe
  dla urządzeń mobilnych.
*/
let snakeT;
let canvas, ctx;
let scoreEl, highScoreEl, gameOverEl, startMessageEl;

// Ustawienia gry
const gridSize = 20;
let snake, food, score, highScore, direction, gameInterval, isPaused, isGameOver, isGameStarted;

// Zmienne do obsługi dotyku
let touchStartX = 0;
let touchStartY = 0;
// ZMIANA: Dodajemy próg, aby uniknąć przypadkowych ruchów
const touchThreshold = 20; // mniejsza wartość = większa czułość

/**
 * Rysuje element na planszy (kwadrat).
 * @param {number} x - Pozycja X.
 * @param {number} y - Pozycja Y.
 * @param {string} color - Kolor elementu.
 */
function draw(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

/**
 * Główna pętla gry.
 */
function gameLoop() {
    if (isPaused || isGameOver) return;

    const head = { ...snake[0] };

    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    if (head.x < 0 || head.x * gridSize >= canvas.width || head.y < 0 || head.y * gridSize >= canvas.height) {
        endGame();
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => draw(segment.x, segment.y, index === 0 ? '#3498db' : '#2980b9'));
    draw(food.x, food.y, '#e74c3c');
}

/**
 * Generuje jedzenie w losowym miejscu na planszy.
 */
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
    for (const segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

/**
 * Ustawia grę w stanie początkowym, ale jej nie uruchamia.
 */
function setupNewGame() {
    if (gameInterval) clearInterval(gameInterval);

    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    isPaused = false;
    isGameOver = false;
    isGameStarted = false;

    scoreEl.textContent = score;
    highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreEl.textContent = highScore;
    gameOverEl.classList.add('hidden');
    startMessageEl.classList.remove('hidden');

    generateFood();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => draw(segment.x, segment.y, index === 0 ? '#3498db' : '#2980b9'));
    draw(food.x, food.y, '#e74c3c');
}

/**
 * Uruchamia pętlę gry po pierwszej interakcji użytkownika.
 */
function startGameLoop() {
    if (isGameStarted) return;
    isGameStarted = true;
    startMessageEl.classList.add('hidden');
    gameInterval = setInterval(gameLoop, 100);
}

/**
 * Kończy grę.
 */
function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreEl.textContent = highScore;
    }
    gameOverEl.classList.remove('hidden');
}

/**
 * Obsługuje zdarzenia naciśnięcia klawiszy.
 */
function handleKeyDown(e) {
    if (!isGameStarted) {
        startGameLoop();
    }
    
    const key = e.key;
    if (key === ' ' || key === 'p' || key === 'P') {
        isPaused = !isPaused;
        return;
    }
    const newDirection = {
        'ArrowUp': 'up', 'w': 'up', 'W': 'up',
        'ArrowDown': 'down', 's': 'down', 'S': 'down',
        'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
        'ArrowRight': 'right', 'd': 'right', 'D': 'right'
    }[key];

    if (newDirection) {
        const isOpposite = (dir1, dir2) =>
            (dir1 === 'up' && dir2 === 'down') || (dir1 === 'down' && dir2 === 'up') ||
            (dir1 === 'left' && dir2 === 'right') || (dir1 === 'right' && dir2 === 'left');

        if (!isOpposite(direction, newDirection)) {
            direction = newDirection;
        }
    }
}

function handleTouchStart(e) {
    e.preventDefault();
    const firstTouch = e.touches[0];
    touchStartX = firstTouch.clientX;
    touchStartY = firstTouch.clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchStartX || !touchStartY) return;

    if (!isGameStarted) {
        startGameLoop();
    }

    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    let newDirection = '';

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Ruch poziomy
        if (Math.abs(diffX) > touchThreshold) {
            newDirection = diffX > 0 ? 'right' : 'left';
        }
    } else {
        // Ruch pionowy
        if (Math.abs(diffY) > touchThreshold) {
            // ZMIANA: Odwrócona logika dla osi Y
            // Przesunięcie palcem w dół (większa wartość Y) to ruch "down"
            // Przesunięcie palcem w górę (mniejsza wartość Y) to ruch "up"
            newDirection = diffY > 0 ? 'down' : 'up';
        }
    }

    const isOpposite = (dir1, dir2) =>
        (dir1 === 'up' && dir2 === 'down') || (dir1 === 'down' && dir2 === 'up') ||
        (dir1 === 'left' && dir2 === 'right') || (dir1 === 'right' && dir2 === 'left');

    if (newDirection && !isOpposite(direction, newDirection)) {
        direction = newDirection;
        // ZMIANA: Resetujemy pozycję startową po zarejestrowaniu ruchu,
        // aby uniknąć wielokrotnych zmian kierunku w jednym geście.
        touchStartX = 0;
        touchStartY = 0;
    }
}


/**
 * Główna funkcja inicjalizująca grę.
 */
export function initializeSnakeGame(dependencies) {
    snakeT = dependencies.t;

    canvas = document.getElementById('snake-canvas');
    if (!canvas) return [];
    ctx = canvas.getContext('2d');
    scoreEl = document.getElementById('snake-score');
    highScoreEl = document.getElementById('snake-high-score');
    gameOverEl = document.getElementById('snake-game-over');
    startMessageEl = document.getElementById('snake-start-message');
    const restartBtn = document.getElementById('restart-snake-game-btn');

    document.addEventListener('keydown', handleKeyDown);
    restartBtn.addEventListener('click', setupNewGame);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    setupNewGame();

    const cleanup = () => {
        clearInterval(gameInterval);
        document.removeEventListener('keydown', handleKeyDown);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
    };

    return [cleanup];
}
