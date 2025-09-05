/*
  EN: This module encapsulates the logic for the Memory Game, demonstrating a
  creative approach to building interactive browser-based games. It highlights
  skills in game state management, event handling, and dynamic element
  creation and manipulation.
  PL: Ten moduł zawiera logikę dla gry pamięciowej, demonstrując kreatywne
  podejście do tworzenia interaktywnych gier przeglądarkowych. Podkreśla
  umiejętności w zarządzaniu stanem gry, obsłudze zdarzeń oraz dynamicznym
  tworzeniu i manipulowaniu elementami.
*/
let memoryT, showConfirmationModal, playSound;

export function initializeMemoryGame(dependencies) {
    memoryT = dependencies.t;
    showConfirmationModal = dependencies.showConfirmationModal;
    playSound = dependencies.playSound;

    const board = document.getElementById('memory-game-board');
    const movesCounter = document.getElementById('moves-counter');
    const timeCounter = document.getElementById('time-counter');
    const restartBtn = document.getElementById('restart-memory-game-btn');
    
    const icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let hasFlippedCard = false, lockBoard = false;
    let firstCard, secondCard;
    let moves = 0, seconds = 0, matchedPairs = 0;
    let memoryGameInterval = null;

    function startTimer() {
        if (memoryGameInterval) clearInterval(memoryGameInterval);
        seconds = 0;
        timeCounter.textContent = seconds;
        memoryGameInterval = setInterval(() => {
            seconds++;
            timeCounter.textContent = seconds;
        }, 1000);
    }

    function createBoard() {
        board.innerHTML = '';
        matchedPairs = 0;
        const cardIcons = [...icons, ...icons].sort(() => 0.5 - Math.random());
        cardIcons.forEach(icon => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.icon = icon;
            cardElement.innerHTML = `<div class="card-face card-front"></div><div class="card-face card-back">${icon}</div>`;
            board.appendChild(cardElement);
            cardElement.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        playSound('flip');
        this.classList.add('flipped');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            if (moves === 0 && seconds === 0) startTimer();
        } else {
            secondCard = this;
            moves++;
            movesCounter.textContent = moves;
            checkForMatch();
        }
    }

    function checkForMatch() {
        firstCard.dataset.icon === secondCard.dataset.icon ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        playSound('match');
        if (matchedPairs === icons.length) {
            clearInterval(memoryGameInterval);
            setTimeout(() => showConfirmationModal(memoryT('memoryGameWin', { moves, time: seconds }), restartGame), 500);
        }
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1200);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function restartGame() {
        if (memoryGameInterval) clearInterval(memoryGameInterval);
        moves = 0;
        seconds = 0;
        movesCounter.textContent = moves;
        timeCounter.textContent = seconds;
        resetBoard();
        createBoard();
    }

    restartBtn.addEventListener('click', () => {
        playSound('click');
        restartGame();
    });
    restartGame();

    const cleanup = () => {
        clearInterval(memoryGameInterval);
    };
    return [cleanup];
}
