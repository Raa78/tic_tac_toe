'use strict';

let players = ["x", "o"];

let activePlayer = 0;

let playingBoard = [];

let winningСombinations = [];

let numberCells = null;


/**
 * Стартовая функция
 * Обнуляет значения перед игрой - поле, выигрышные комбинации, стартового игрока.
 * Создает игровое поле - массив массивов.
 * Вызвать функцию renderBoard для отрисовки игрового поля.
 */
function startGame() {
  // Очищаем поле, выигрышные комбинации, игру всегда начинает 1й игрок('Х')
  playingBoard = [];
  winningСombinations = [];
  activePlayer = 0;

  // Это задел, что бы дать пользователю выбрать кол-во ячеек для игрового поля.
  // Закомментировано, тк не требуется по ТЗ
  // numberCells = prompt("Введите числом количество ячеек от 3 и более:");

  numberCells = checkNumberCellsPerRow(numberCells);

  let line = Array(numberCells).fill("");

  // Для ускорения цикла используется модуль из языка C++ :)
  for (let c = 0; c < numberCells; c++) {
    playingBoard.push(line.slice());
  }

  renderBoard(playingBoard);
  console.log('Стартовое поле=>', playingBoard);

  renderWinningСombinations(numberCells);
  console.log('Выигрышные комбинации=>', winningСombinations);
}


/**
 * Функция проверяет является ли переданное значение числом
 * @param {number} number
 */
function checkNumberCellsPerRow(number) {
  if (isNaN(number)) return 3;

  number = +number < 3 ? 3 : +number;

  return number;
}


/**
 * Функция автоматически формирует выигрышные комбинации на основании размера поля
 * @param {number} number - количество ячеек в строке и столбце
 */
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

  // Формируем выигрышные комбинации по столбцам на основе массива комбинаций по строкам
  let sliceWinningСombinations = winningСombinations.slice();

  for (let index = 0; index < sliceWinningСombinations.slice().length; index++) {
    sliceWinningСombinations.forEach(el => {
      storage.push(el[index]);
    });

    winningСombinations.push(storage);
    storage = [];
  }

  // Формируем выигрышную комбинацию по диагонали с лева на право
  for (let index = 0; index < flatPlayingBoard.length; index += number + 1) {
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


/**
 * Функция проставляет ходы на поле и определяет победителя
 * @param {number} line - строка на поле
 * @param {number} column - столбец на поле
 */
function click(line, column) {
  playingBoard[line][column] = players[activePlayer];

  renderBoard(playingBoard);

  let chekWin = checkWinner(players[activePlayer]);

  if (chekWin) {
    showWinner(activePlayer);
  }

  // Делаем проверку на ничью и выводим сообщение по подобию fn showWinner()
  if (!playingBoard.flat().includes('')) {
    showDraw();
  }

  activePlayer = activePlayer === 0 ? 1 : 0;
}


/**
 * Функция проставляет ходы на поле и определяет победителя
 * @param {number} player - номер игрока
 * @returns {boolean}
 */
function checkWinner(player) {
  let filledСells = [];

  playingBoard.flat().forEach((item, index) => {
    if (item === player) {
      filledСells.push(index);
    }
  });

  for (let elWinningCombination of winningСombinations) {
    let numberMatches = 0;

    elWinningCombination.forEach(num => {
      if (filledСells.includes(num)) numberMatches++;

      if (numberMatches === 0) return false;
    });

    if (numberMatches === numberCells) return true;
  }

  return false;
}


/**
 * Функция выводит на экран сообщение, если результат - ничья
 */
function showDraw() {
  let header = modalEl.getElementsByTagName('h2')[0];

  header.textContent = `🤝 Ничья! 🤝`;

  modalEl.classList.remove('hidden');
}
