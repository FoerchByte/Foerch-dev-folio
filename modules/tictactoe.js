/*
  EN: This module contains the core logic for the Tic-Tac-Toe game. It demonstrates
  game state management, win condition checks, and a simple AI for the
  player-versus-computer mode. It's a great example of building a classic game
  from the ground up using pure JavaScript.
  PL: Ten moduł zawiera kluczową logikę dla gry w Kółko i Krzyżyk. Demonstruje
  zarządzanie stanem gry, sprawdzanie warunków zwycięstwa oraz prostą sztuczną
  inteligencję dla trybu gracz kontra komputer. To doskonały przykład budowania
  klasycznej gry od podstaw za pomocą czystego JavaScriptu.
*/

let tictactoeT;
let gameState = {};
let ticTacToeScores = { X: 0, O: 0 };

function startGame() {
    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('game-view').style.display = 'flex';
    initializeBoard();
}

function initializeBoard() {
    gameState = {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        gameActive: true,
        gameMode: document.querySelector('.game-mode-selector button.active').dataset.mode,
        playerSymbol: document.querySelector('.side-selector button.active').dataset.side,
    };
    gameState.computerSymbol = gameState.playerSymbol === 'X' ? 'O' : 'X';

    const boardEl = document.getElementById('game-board');
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardEl.appendChild(cell);
    }
    updateGameStatus();
    updateScoreboard();

    if (gameState.gameMode === 'pvc' && gameState.currentPlayer !== gameState.playerSymbol) {
        setTimeout(computerMove, 500);
    }
}

function updateScoreboard() {
    document.getElementById('scoreboard').innerHTML = `${tictactoeT('ticTacToeScore')}: X - ${ticTacToeScores.X} | O - ${ticTacToeScores.O}`;
}

function updateGameStatus() {
    const statusEl = document.getElementById('game-status');
    if (gameState.winner) {
        statusEl.textContent = tictactoeT('ticTacToeWinner', gameState.winner);
    } else if (!gameState.gameActive) {
        statusEl.textContent = tictactoeT('ticTacToeDraw');
    } else {
        statusEl.textContent = tictactoeT('ticTacToeTurn', gameState.currentPlayer);
    }
}

function handleCellClick(event) {
    const clickedCellIndex = parseInt(event.target.dataset.index);
    if (gameState.board[clickedCellIndex] || !gameState.gameActive || (gameState.gameMode === 'pvc' && gameState.currentPlayer !== gameState.playerSymbol)) {
        return;
    }
    makeMove(clickedCellIndex, gameState.currentPlayer);
    if (gameState.gameActive && gameState.gameMode === 'pvc') {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {
    if (!gameState.board[index] && gameState.gameActive) {
        gameState.board[index] = player;
        const cell = document.querySelector(`.cell[data-index='${index}']`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        checkGameResult();
    }
}

function computerMove() {
    if (!gameState.gameActive) return;
    const availableCells = gameState.board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        const randomMove = availableCells[Math.floor(Math.random() * availableCells.length)];
        makeMove(randomMove, gameState.computerSymbol);
    }
}

function checkGameResult() {
    const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let roundWon = false;
    let winningLine = [];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            roundWon = true;
            winningLine = condition;
            break;
        }
    }

    if (roundWon) {
        gameState.winner = gameState.currentPlayer;
        ticTacToeScores[gameState.currentPlayer]++;
        gameState.gameActive = false;
        winningLine.forEach(index => {
            document.querySelector(`.cell[data-index='${index}']`).classList.add('winning');
        });
    } else if (!gameState.board.includes(null)) {
        gameState.gameActive = false;
    } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    }
    updateGameStatus();
    updateScoreboard();
}

export function initializeTicTacToeApp(dependencies) {
    tictactoeT = dependencies.t;

    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('restart-game-btn').addEventListener('click', initializeBoard);
    document.getElementById('game-mode-selector').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#game-mode-selector button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
    document.getElementById('side-selector').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#side-selector button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
    return [];
}
