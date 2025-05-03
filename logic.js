let players = ["x", "o"];
let activePlayer = 0;
let playingField = [];
let winningСombinations = [];


function checkNumberCellsPerRow(numberCells) {

  if (isNaN(numberCells)) {
    return 3;
  }

  numberCells = +numberCells < 3 ? 3 : +numberCells;

  return numberCells;
}

function renderWinningСombinations(numberCells) {

    // Формируем выигрышные комбинации по строкам и столбцам
    let storage = [];

    let flatPlayingField = playingField.flat();

    flatPlayingField.flat().forEach((item, index) => {
      storage.push(index);

      if (storage.length === numberCells) {
        // winningСombinations.push(storage.join());
        winningСombinations.push(storage);
        storage = [];
      }
    });

  // Формируем выигрышную комбинацию по диагонали с лева на право
    for (let index = 0; index < flatPlayingField.length; index += numberCells + 1) {
      storage.push(index);
    }

    winningСombinations.push(storage);
    storage = [];

    // Формируем выигрышную комбинацию по диагонали с право yf ktdj
    for (let index = numberCells - 1; index < flatPlayingField.length - 1 ; index += numberCells-1) {
      storage.push(index);
    }

    winningСombinations.push(storage);
    storage = [];

}


function startGame() {

  // Перед каждой игрой очищаем поле
  playingField = [];

  let numberCells;
  // Это задел, если дать пользователю выбирать кол-во ячеек для игры
  // numberCells = prompt("Введите числом кол-во ячеек от 3 и более:");

  let numberCellsPerRow = checkNumberCellsPerRow(numberCells);

  let line = Array(numberCellsPerRow).fill('');

  // Для ускорения цикла используется модуль из языка C++
  for (let c = 0; c < numberCellsPerRow; c++) {
    playingField.push(line.slice());
  }

  renderBoard(playingField);

  renderWinningСombinations(numberCellsPerRow);
  console.log(winningСombinations);

  players[activePlayer];
}

function click(line, column) {

  playingField[line][column] = players[activePlayer];

  renderBoard(playingField);

  // showWinner(activePlayer);


  activePlayer = activePlayer === 0 ? 1 : 0;
}
