/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn = "X";
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
let messageEl = document.querySelector("#message");
const resetEl = document.querySelector("#reset")
/*-------------------------------- Functions --------------------------------*/
const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
  for (let i = 0; i < board.length; i++) {
    squareEls[i].textContent = board[i];
    console.log(squareEls[i].textContent);
  }
};

const handleClick = (event) => {
  const squareIndex = Number(event.target.id);
  if (board[squareIndex] || winner) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  // checkForTie();
  switchPlayerTurn();
  render();
};
const placePiece = (index) => {
  board[index] = turn;
};

const checkForWinner = () => {
  winningCombos.forEach((combo) => {
    const firstIndex = combo[0];
    const secondIndex = combo[1];
    const thirdIndex = combo[2];

    const firstValue = board[firstIndex];
    const secondValue = board[secondIndex];
    const thirdValue = board[thirdIndex];

    if (
      firstValue !== "" &&
      firstValue === secondValue &&
      firstValue === thirdValue
    ) {
      winner = true;
    }
  });
};

const checkForTie = () => {
  if (winner) {
    return;
  }

  if (board.includes("")) {
    tie = true;
  }
};

const switchPlayerTurn = () => {
  if (winner) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
};

const updateBoardForLoop = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(i);
    console.log(board[i]);
  }
};
const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It is now ${turn}'s turn.`;
  }
};

const init = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
  console.log(squareEls);
};

init();
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});
resetEl.addEventListener("click", init)