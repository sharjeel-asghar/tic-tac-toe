// @ts-nocheck
const startGameWindow = document.querySelector(".start-game");
const playingGameWindow = document.querySelector(".playing-game");
const newRoundBtn = document.querySelector('.next-round-btn');
const quitBtns = document.querySelectorAll('.quit-btn');
const newGameBtnVSPlayer = document.querySelector('.new-game-btn.player');
const newGameBtnVSCPU = document.querySelector('.new-game-btn.cpu');
const resetBtn = document.querySelector('.reset');
const boxes = document.querySelectorAll(".box");
const turnIcon = document.querySelector(".current-turn img");
const player1Counts = document.querySelector(".first-player-win .number-of")
const player2Counts = document.querySelector(".second-player-win .number-of")
const tiesCounts = document.querySelector(".ties .number-of")
const resultText = document.querySelector('.result-text');
const winingMark = document.querySelector('.wining-Mark');
const resultEndText = document.querySelector('.wining-player-text')
const reusltWindow = document.querySelector('.result-window')
const overlay = document.querySelector('.overlay')
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]
const SelectionBtns = document.querySelectorAll('.selection-btn')
const selectedMark = document.querySelector('.selected-mark .mark');

const turnX = "x";
const turnO = "O";
let Player1Turn = turnX;
let currentTurn = Player1Turn;
let winnerFound = false;
let player1WinCount = 0;
let player2WinCount = 0;
let Ties = 0;


player1Counts.innerText = player1WinCount.toString();
player2Counts.innerText = player2WinCount.toString();
tiesCounts.innerText = Ties.toString();



boxes.forEach(box => {
  box.addEventListener("click", () => {
    RunTurn(box);
  })
})

function RunTurn(box) {
  if (currentTurn === turnX) {
    box.setAttribute("id", "x-humanPlayer");
    checkWinner();
    currentTurn = turnO;
    updateTurnText()
  } else if (currentTurn === turnO) {
    box.setAttribute("id", "circle-humanPlayer");
    checkWinner();
    currentTurn = turnX;
    updateTurnText()
  }
}

function updateTurnText() {
  if (currentTurn === turnX) {
    turnIcon.setAttribute("src", "./images/icon-x.svg");
  } else {
    turnIcon.setAttribute("src", "./images/icon-o.svg");
  }
}

updateTurnText()

function checkWinner() {
  for (let pattern of winPatterns) {
    let value1 = boxes[pattern[0]].id;
    let value2 = boxes[pattern[1]].id;
    let value3 = boxes[pattern[2]].id;
    if (value1 != "" && value2 != "" && value3 != "") {
      if (value1 === value2 && value2 === value3) {
        winnerFound = true;
        console.log("Winner is " + currentTurn);
        if (currentTurn === turnX) {
          player1WinCount++;
          player1Counts.innerText = player1WinCount.toString();
        } else if (currentTurn === turnO) {
          player2WinCount++;
          player2Counts.innerText = player2WinCount.toString();
        }
        endGame();
      }
    }
  }

  let allboxesFilled = true;
  boxes.forEach(box => {
    if (!box.id) {
      allboxesFilled = false;
    }
  })

  if (allboxesFilled && !winnerFound) {
    console.log("its a tie");
    Ties++;
    tiesCounts.innerText = Ties.toString();
    endGame(allboxesFilled);
  }
}

resetBtn.addEventListener("click", () => {
  Reset();
})



function endGame(allboxesFilled = true) {
  if (currentTurn === turnX && winnerFound) {
    resultText.innerText = "Player 2, YOU LOST...";
    winingMark.innerText = 'X';
  }
  else if (currentTurn === turnO && winnerFound) {
    resultText.innerText = "Player 1, YOU LOST...";
    winingMark.innerText = 'O';
  } else if (!winnerFound && allboxesFilled) {
    resultText.innerText = "Tie";
    winingMark.innerText = '';
    resultEndText.innerHTML = 'Its a Tie'
  }

  reusltWindow.classList.add("active");
  overlay.classList.add("active")
}



function Reset() {
  boxes.forEach(box => {
    box.setAttribute("id", "");
  });
  player1WinCount = 0;
  player2WinCount = 0;
  Ties = 0;
  currentTurn = Player1Turn;
  updateTurnText();
  player1Counts.innerText = player1WinCount.toString();
  player2Counts.innerText = player2WinCount.toString();
  tiesCounts.innerText = Ties.toString();
}

function StartnewGame() {
  Reset();
  startGameWindow.classList.remove('active');
  playingGameWindow.classList.add("active");
  reusltWindow.classList.remove("active");
  overlay.classList.remove("active");
}

function StartNewRound() {
  reusltWindow.classList.remove("active");
  overlay.classList.remove("active");
  boxes.forEach(box => {
    box.setAttribute("id", "");
  });
  currentTurn = Player1Turn;
  updateTurnText();
}

function Menu() {
  Reset();
  startGameWindow.classList.add('active');
  playingGameWindow.classList.remove("active");
  reusltWindow.classList.remove("active");
  overlay.classList.remove("active");
}


newRoundBtn.addEventListener('click', () => {
  StartNewRound();
})

quitBtns.forEach(quitBtn => {
  quitBtn.addEventListener('click', () => {
    Menu();
  })
})


newGameBtnVSPlayer.addEventListener('click', () => {
  StartnewGame();
})

newGameBtnVSCPU.addEventListener('click', () => {
  alert("Coming Soon...")
})


SelectionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    SelectionBtns.forEach(btn => btn.classList.remove('selected'));
    btn.classList.add("selected");
    let btnText = btn.innerText;
    if (btnText === "X") {
      Player1Turn = turnX;
      selectedMark.innerText = "X";
    }
    else if (btnText === "O") {
      Player1Turn = turnO;
      selectedMark.innerText = "O";
    }
  })
})