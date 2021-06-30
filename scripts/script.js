const winPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const dataCells = [...document.querySelectorAll("[data-cell]")];
const gameResult = document.getElementById("previousGameResult");
const newGameBackground = document.getElementById("newGame");
const newGameButton = document.getElementById("newGameButton");

let isCross = true;

startGame();

newGameButton.addEventListener("click", newGame);

function newGame() {
  isCross = true;
  startGame();
}

function startGame() {
  newGameBackground.style = "display: none;";
  for (let i = 0; i < dataCells.length; i++) {
    dataCells[i].innerHTML = "";
    dataCells[i].removeEventListener("click", createSymbol);
    dataCells[i].addEventListener("click", createSymbol);
  }
}

function createSymbol(element) {
  if (!element.target.innerHTML) {
    if (isCross) {
      createCross(element);
    } else {
      createCircle(element);
    }

    if (checkWin(isCross)) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    }

    isCross = !isCross;
  }
}

function createCircle(element) {
  if (!element.target.innerHTML) {
    element.target.innerHTML = `
    <div class="circle">
    </div>
    `;
  }
}

function createCross(element) {
  if (!element.target.innerHTML) {
    element.target.innerHTML = `
      <div class="cross">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    `;
  }
}

function endGame(isDraw) {
  newGameBackground.style = "display: flex;";
  if (isDraw) {
    gameResult.innerHTML = "Draw!";
  } else {
    gameResult.innerHTML = `${isCross ? "Crosses'" : "Circles'"} Wins!`;
  }
}

function checkWin(isCross) {
  return winPositions.some((combination) => {
    return combination.every((index) => {
      return isCross
        ? dataCells[index]?.children[0]?.classList.contains("cross")
        : dataCells[index]?.children[0]?.classList.contains("circle");
    });
  });
}

function checkDraw() {
  return dataCells.every((cell) => {
    return (
      cell.children[0]?.classList?.contains("cross") ||
      cell.children[0]?.classList?.contains("circle")
    );
  });
}
