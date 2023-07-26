const board = document.getElementById('board');
const cells = document.getElementsByClassName('cell');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return !gameBoard.includes('');
}

function handleClick(cellIndex) {
  if (!gameOver && !gameBoard[cellIndex]) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    if (checkWinner()) {
      gameOver = true;
      message.textContent = `Jogador ${currentPlayer} venceu!`;
    } else if (checkDraw()) {
      gameOver = true;
      message.textContent = 'Empate!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `É a vez do jogador ${currentPlayer}`;
    }
  }
}

function initGame() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    gameBoard[i] = '';
    gameOver = false;
    currentPlayer = 'X';
    message.textContent = `É a vez do jogador ${currentPlayer}`;

    cells[i].addEventListener('click', () => handleClick(i));
  }
  restartButton.classList.add('hidden');
}

initGame();
restartButton.addEventListener('click', initGame);

