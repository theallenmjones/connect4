
const ROWS = 6;
const COLS = 7;
const board = [];

for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
        board[i][j] = 0;
    }
}

const container = document.querySelector(".container");

for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", i);
        cell.setAttribute("data-col", j);
        container.appendChild(cell);
    }
}

const cells = document.querySelectorAll(".cell");
let currentPlayer = 1;

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick() {
    const row = parseInt(this.getAttribute("data-row"));
    const col = parseInt(this.getAttribute("data-col"));

    for (let i = ROWS - 1; i >= 0; i--) {
        if (board[i][col] === 0) {
            board[i][col] = currentPlayer;
            this.style.backgroundColor = currentPlayer === 1 ? "red" : "yellow";
            if (checkForWin(i, col, currentPlayer)) {
                alert(`Player ${currentPlayer} wins!`);
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            break;
        }
    }
}

function checkForWin(row, col, player) {
    // Check for a horizontal win
    let count = 0;
    for (let j = 0; j < COLS; j++) {
        if (board[row][j] === player) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    // Check for a vertical win
    count = 0;
    for (let i = 0; i < ROWS; i++) {
        if (board[i][col] === player) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    // Check for a diagonal win (top-left to bottom-right)
    count = 0;
    const startRow = Math.max(0, row - col);
    const startCol = Math.max(0, col - row);
    for (let i = startRow, j = startCol; i < ROWS && j < COLS; i++, j++) {
        if (board[i][j] === player) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    // Check for a diagonal win (bottom-left to top-right)
    count = 0;
    const diff = Math.min(row, COLS - 1 - col);
    const i = row - diff;
    const j = col + diff;
    for (let x = i, y = j; x <= ROWS - 1 && y >= 0; x++, y--) {
        if (board[x][y] === player) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    return false;
}

