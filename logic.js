let players = ["x", "o"];
let activePlayer = 0;

let playingField = [];


function checkNumberCellsPerRow(value) {

  if (isNaN(value)) {
    return 3;
  }

  return +value < 3 ? 3 : +value;
}

function startGame() {
  let numberCells;
  // numberCells = prompt("Введите кол-во ячеек в строке:");

  let numberCellsPerRow = checkNumberCellsPerRow(numberCells);

  let line = Array(numberCellsPerRow).fill('');

  // Для ускорения цикла используется модуль из C++
  for (let c = 0; c < numberCellsPerRow; c++) {
    playingField.push(line.slice());
  }

  renderBoard(playingField);

  players[activePlayer];
}

function click(line, column) {
  playingField[line][column] = players[activePlayer];
  console.log(playingField);
  renderBoard(playingField);


  activePlayer = activePlayer === 0 ? 1 : 0;
}
