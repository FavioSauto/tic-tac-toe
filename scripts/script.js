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
const sizes = [20, 30, 40, 50, 60, 70, 80, 90, 100];
const dataCells = [...document.querySelectorAll("[data-cell]")];
const gameResult = document.getElementById("previousGameResult");
const newGameBackground = document.getElementById("newGame");
const newGameButton = document.getElementById("newGameButton");
const crossContainer = document.getElementById(`cross-figures`);
const circleContainer = document.getElementById(`circle-figures`);

let isCross = true;
let figureSelected = false;
let selectedSize = 0;

startGame();

newGameButton.addEventListener("click", newGame);

function newGame() {
  isCross = true;
  selectedSize = 0;
  figureSelected = false;

  cleanBoard();

  startGame();
}

function startGame() {
  newGameBackground.style = "display: none;";
  for (let i = 0; i < dataCells.length; i++) {
    dataCells[i].innerHTML = "";
    dataCells[i].removeEventListener("click", createSymbol);
    dataCells[i].addEventListener("click", createSymbol);
  }
  createFigures('cross', sizes);
  createFigures('circle', sizes);
}

function createSymbol(element) {
  if (figureSelected && selectedSize > 0 && Number(element.target.getAttribute('data-size')) < selectedSize) {
    element.target.setAttribute('data-size', selectedSize)
    
    isCross ? element.target.classList.add('x') : element.target.classList.add('o');
    
    if (isCross) {
      createCross(element, selectedSize);
      figureSelected = false;
    } else {
      createCircle(element, selectedSize);
      figureSelected = false;
      }

    if (checkWin(isCross)) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    }

    isCross = !isCross;
  }
}

function createCircle(element, size) {
  element.target.innerHTML = '';

  
  element.target.innerHTML = `
  <div class="circle" data-size=${size} style="width: ${size}px; height: ${size}px">
  </div>
  `;

  element.target.children[0].addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

function createCross(element, size) {
  element.target.innerHTML = '';

  
  element.target.innerHTML = `
  <div class="cross" data-size=${size} style="width: ${size}px; height: ${size}px">
  </div>
  `;

  element.target.children[0].addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

function endGame(isDraw) {
  newGameBackground.style = "display: flex;";
  if (isDraw) {
    gameResult.innerHTML = "Draw!";
  } else {
    gameResult.innerHTML = `${isCross ? "Crosses'" : "Circles'"} Wins!`;
  }
}

function createFigures(type, sizes) {
  const figuresContainer = document.getElementById(`${type}-figures`);

  sizes.forEach(size => {
    const figure = document.createElement("div");
    figure.setAttribute('data-size', size)
    figure.classList = `${type} ${type}-figure`

    figure.style = `width: ${size}px; height: ${size}px`;

    figure.addEventListener('click', function() {
      selectFigure(type, size, figure)
    })

    figuresContainer.appendChild(figure);
  })
}

function selectFigure(type, size, figure) {
  if (isCross && type === 'cross' && figureSelected !== true) {
    selectedSize = size;
    figureSelected = true;
    figure.parentNode.removeChild(figure);
  } else if (!isCross && type === 'circle' && figureSelected !== true) {
    selectedSize = size;
    figureSelected = true;
    figure.parentNode.removeChild(figure);
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

function cleanBoard() {
  crossContainer.innerHTML = "";
  circleContainer.innerHTML = "";

  dataCells.forEach((cell) => {cell.classList.remove('x'); cell.classList.remove('o'); cell.setAttribute('data-size', 0)})
}