const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
let currentPlayer = "X";
let gameActive = true;

// Kombinationen für einen Gewinn
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Spiel starten
function startGame() {
  cells.forEach((cell) => {
    cell.classList.remove("clicked-x", "clicked-o");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  currentPlayer = "X";
  gameActive = true;
  board.classList.remove("game-over");
}

// Klick auf Zelle
function handleClick(e) {
  const cell = e.target;

  // Spieler setzen
  placeMark(cell, currentPlayer);

  // Gewinner prüfen
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

// Zeichen setzen
function placeMark(cell, player) {
  cell.textContent = player;
  cell.classList.add(player === "X" ? "clicked-x" : "clicked-o");
}

// Spieler wechseln
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Prüfen auf Gewinn
function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

// Prüfen auf Unentschieden
function isDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === "X" || cell.textContent === "O";
  });
}

// Spiel beenden
function endGame(draw) {
  gameActive = false;
  if (draw) {
    alert("Unentschieden!");
  } else {
    alert(`${currentPlayer} gewinnt!`);
  }

  setTimeout(() => {
    startGame();
  }, 2000);
}

// Initial starten
startGame();
