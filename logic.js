let players = ["x", "o"];
let activePlayer = 0;
let playingBoard = [];
let winningСombinations = [];
let numberCells = null;


function checkNumberCellsPerRow(numberCells) {
  if (isNaN(numberCells)) {
    return 3;
  }

  numberCells = +numberCells < 3 ? 3 : +numberCells;

  return numberCells;
}


function renderWinningСombinations(numberCells) {
  let storage = [];

  // Формируем выигрышные комбинации по строкам и столбцам
  let flatPlayingBoard = playingBoard.slice().flat();

  flatPlayingBoard.flat().forEach((item, index) => {
    storage.push(index);

    if (storage.length === numberCells) {
      winningСombinations.push(storage);
      // winningСombinations2.push(storage.join());
      storage = [];
    }
  });

  // Формируем выигрышную комбинацию по диагонали с лева на право
  for (
    let index = 0;
    index < flatPlayingBoard.length;
    index += numberCells + 1
  ) {
    storage.push(index);
  }

  winningСombinations.push(storage);
  storage = [];

  // Формируем выигрышную комбинацию по диагонали с право yf ktdj
  for (let index = numberCells - 1; index < flatPlayingBoard.length - 1; index += numberCells - 1) {
    storage.push(index);
  }

  winningСombinations.push(storage);
  storage = [];
}

function startGame() {
  // Перед каждой игрой очищаем поле и выигрышные комбинации
  playingBoard = [];
  winningСombinations = [];
  // Можно сбросить очерндность игроков, что бы всегда начинали 'Х'
  // let activePlayer = 0;

  // Это задел, если дать пользователю выбирать кол-во ячеек для игры
  numberCells = prompt("Введите числом количество ячеек от 3 и более:");

  let numberCellsPerRow = checkNumberCellsPerRow(numberCells);

  let line = Array(numberCellsPerRow).fill("");

  // Для ускорения цикла используется модуль из языка C++
  for (let c = 0; c < numberCellsPerRow; c++) {
    playingBoard.push(line.slice());
  }

  renderBoard(playingBoard);

  renderWinningСombinations(numberCellsPerRow);
  console.log(winningСombinations);

  players[activePlayer];
}

function click(line, column) {
  playingBoard[line][column] = players[activePlayer];

  renderBoard(playingBoard);

  checkWinner(players[activePlayer]);

  // showWinner(activePlayer);

  activePlayer = activePlayer === 0 ? 1 : 0;
}


function checkWinner(player) {
  console.log(player);
  // console.log(playingBoard);
  // console.log(playingBoard.flat());

  let filledСells = [];

  playingBoard.flat().forEach((item, index) => {
    if (item === player) {
      filledСells.push(index);
    }
  });

  for (elWinningCombination of winningСombinations) {
    // console.log(elWinningCombination);
    let numberMatches = 0;

    elWinningCombination.forEach(num => {
      if (filledСells.includes(num)) {
        console.log(`Есть цифра ${num} заполненом поле в массиве ${elWinningCombination}`);
        numberMatches++;
      }

    });
  }

  console.log(filledСells);
}
