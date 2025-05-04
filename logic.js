let players = ["x", "o"];

let activePlayer = 0;

let playingBoard = [];

let winningСombinations = [];

let numberCells = null;


function checkNumberCellsPerRow(number) {
  if (isNaN(number)) {
    return 3;
  }

  number = +number < 3 ? 3 : +number;

  return number;
}


function renderWinningСombinations(number) {
  let storage = [];

  let flatPlayingBoard = playingBoard.slice().flat();

  // Формируем выигрышные комбинации по строкам
  flatPlayingBoard.forEach((item, index) => {
    storage.push(index);

    if (storage.length === number) {
      winningСombinations.push(storage);
      storage = [];
    }
  });

  // // Формируем выигрышные комбинации по столбцам
  // flatPlayingBoard.forEach((item, index) => {
  //   storage.push(index);

  //   if (storage.length === number) {
  //     winningСombinations.push(storage);
  //     storage = [];
  //   }
  // });


  // Формируем выигрышную комбинацию по диагонали с лева на право
  for (
    let index = 0;
    index < flatPlayingBoard.length;
    index += number + 1
  ) {
    storage.push(index);
  }

  winningСombinations.push(storage);
  storage = [];

  // Формируем выигрышную комбинацию по диагонали с право на лево
  for (let index = number - 1; index < flatPlayingBoard.length - 1; index += number - 1) {
    storage.push(index);
  }

  winningСombinations.push(storage);
  storage = [];
}


function startGame() {
  // Перед каждой игрой очищаем поле, выигрышные комбинации и всегда игру начинает 1й игрок('Х')
  playingBoard = [];
  winningСombinations = [];
  activePlayer = 0;

  // Это задел, что дать пользователю выбирать кол-во ячеек для поля
  // numberCells = prompt("Введите числом количество ячеек от 3 и более:");

  numberCells = checkNumberCellsPerRow(numberCells);

  let line = Array(numberCells).fill("");

  // Для ускорения цикла используется модуль из языка C++
  for (let c = 0; c < numberCells; c++) {
    playingBoard.push(line.slice());
  }

  renderBoard(playingBoard);

  renderWinningСombinations(numberCells);
  console.log(winningСombinations);

  players[activePlayer];
}


function click(line, column) {
  playingBoard[line][column] = players[activePlayer];

  renderBoard(playingBoard);

  let chekWin = checkWinner(players[activePlayer]);

  console.log(`check=>${chekWin}`);


  // showWinner(activePlayer);

  // if (chekWin) {
  //   showWinner(players[activePlayer]);
  // }

  activePlayer = activePlayer === 0 ? 1 : 0;
}


function checkWinner(player) {
  let filledСells = [];

  playingBoard.flat().forEach((item, index) => {
    if (item === player) {
      filledСells.push(index);
    }
  });

  for (elWinningCombination of winningСombinations) {

    let numberMatches = 0;

    elWinningCombination.forEach(num => {

      if (filledСells.includes(num)) {
        numberMatches++;
      }

      if (numberMatches === numberCells){
        console.log(`победили ${player}`);
      }
    });
  }
}
