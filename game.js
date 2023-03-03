/* eslint-disable no-setter-return */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';

(() => {
  // Фразы и названия фигур
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];
  const MESSAGE_ENG = {
    tie: 'Tie!',
    win: 'You win!',
    lose: 'You lose!',
    cancel: 'You canceled the game',
    exit: 'Do you really want to exit?',
    result: 'Player: $$$ Computer: $$$',
    move: 'Enter your move (rock, paper, scissors)',
    invalid: 'Wrong move, try again',
    again: 'Do you want to play again?',
    firstWinMessage: 'Congratulations you have won and you can play MARBLE game',
    changeGameMessage: 'Do you want to play MARBLES?',
    firstMove: 'First move to $$$ , because his winrating more',
    player: 'Player',
    computer: 'Computer',
    numberOfBalls: 'Enter a number of balls',
    evenOrOdd: 'Enter even or odd',

  };
  const MESSAGE_RUS = {
    tie: 'Ничья!',
    win: 'Вы выиграли!',
    lose: 'Вы проиграли!',
    cancel: 'Вы отменили игру',
    exit: 'Действительно ли вы хотите выйти?',
    result: 'Игрок: $$$ Компьютер: $$$',
    move: 'Введите ваш ход (камень, ножницы, бумага)',
    invalid: 'Неверный ход, пожалуйста, попробуйте еще раз.',
    again: 'Еще тянет играть?',
    firstWinMessage: 'Поздравляю, вы выиграли и теперь можете сыграть в марблы',
    changeGameMessage: 'Хотите сыграть в марблы?',
    firstMove: 'Первым ходит $$$ , потому что у него больше выигрышей в прошлой игре',
    player: 'Игрок',
    computer: 'Компьютер',
    numberOfBalls: 'Введите кол-во шариков которое хотите загадать',
    evenOrOdd: 'Введите четное или нечетное',
  };
    // ==========================

  class GameSettings {
    constructor(figures, messages) {
      this.figures = figures;
      this.messages = messages;
    }
  }
  const createObject = (lang) => {
    let gameSettings;
    if (lang === 'ENG' || lang === 'EN') {
      gameSettings = new GameSettings(FIGURES_ENG, MESSAGE_ENG);
      return gameSettings;
    } else {
      gameSettings = new GameSettings(FIGURES_RUS, MESSAGE_RUS);
      return gameSettings;
    }
  };
  // Получаем случайное число в заданном диапозоне
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
    // Ход компьютера, получаем фигуру на основе полученного языка
  const getBotFigure = (settings) => {
    const botRandomNumber = getRandom(1, 3);
    return settings.figures[botRandomNumber - 1];
  };
  // Ход игрока
  const getPlayerMove = (settings) => prompt(settings.messages.move);
  // ОСНОВА ==============================================
  class Result {
    constructor(player, computer) {
      this.player = player;
      this.computer = computer;
    }
    get getCommonResult() {
      return `${this.player} и ${this.computer}`;
    }
    set setPlayerRes(player) {
      return this.player += this.player + player;
    }
    set setComputerResult(computer) {
      return this.computer += this.computer + computer;
    }
  }
  // Конструируем результаты
  const result = new Result(0, 0);
  const game = (lang) => {
    // Конструируем языковой объект
    const settings = createObject(lang);

    // Проверка результатов ходов
    const compareRes = (playerFigure, botFigure) => {
      if (settings.figures.indexOf(playerFigure) === -1) {
        alert(settings.messages.invalid);
        return start(settings);
      }
      if (playerFigure === botFigure) {
        alert(settings.messages.tie);
        return 'tie';
      } else if (
        (botFigure === settings.figures[0] && playerFigure === settings.figures[2]) ||
        (botFigure === settings.figures[1] && playerFigure === settings.figures[0]) ||
        (botFigure === settings.figures[2] && playerFigure === settings.figures[1])
      ) {
        alert(settings.messages.win);
        return 'win';
      } else {
        alert(settings.messages.lose);
        return 'lose';
      }
    };
    // Делаеем ходы

    function start(settings) {
      // запускаем функцию хода компа
      const botFigure = getBotFigure(settings);
      // запускаем функцию хода игрока
      const playerFigure = getPlayerMove(settings);
      if (playerFigure === null || playerFigure === '') {
        const cancel = confirm(settings.messages.exit);
        if (cancel) {
          alert(
              settings.messages.result
                  .replace('$$$', result.player)
                  .replace('$$$', result.computer),
          );
          return;
        } else {
          return game(lang);
        }
      }
      // Все походили, пора сравнить фигуры
      const checkResult = compareRes(playerFigure, botFigure);

      if (checkResult === 'win') {
        result.setPlayerRes = 1;

        console.log(result);
      } else if (checkResult === 'lose') {
        result.setComputerResult = 1;
      }
      alert(`Компьютер показал: ${playerFigure} Игрок показал: ${botFigure}`);

      // Если есть хоть одна победа то можно играть в марблы
      if (result.player >= 1) {
        console.log('Есть одна победа игрока можно двигаться дальше');
        alert(settings.messages.firstWinMessage);
        const nextGame = confirm(settings.messages.changeGameMessage);
        if (nextGame) {
          return result;
        } else {
          game(lang);
        }
      } else {
        const again = confirm(settings.messages.again);
        if (again) {
          game(lang);
        } else {
          alert(
              `Игрок выиграл ${result.player} раз,Компьютер выиграл ${result.computer} раз`);
          return;
        }
      }
      return result;
    }
    start(settings);
    let gameWinner;
    if (result.player > result.computer) {
      gameWinner = 'player';
      return [gameWinner, settings];
    } else if (result.player === result.computer) {
      alert('Равное кол-во побед не катит');
      alert(settings.messages.cancel);
    } else {
      gameWinner = 'bot';
      return [gameWinner, settings];
    }
  };
  window.rps = game;
})();

(() => {
  // Исходное кол-во "Яблок" (Как в школе у Пети и Маши было по 5 яблок)
  let playerBalls = 5;
  let botBalls = 5;

  // Получаем случайное число в заданном диапозоне
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Фунция получения ответа от бездушной машины. Привет Atomic Heart.
  const compAnswer = () => getRandom(1, 2);

  // Четное или нет число
  const evenOrOdd = (num) => {
    if (num % 2) {
      return 'четное';
    } else {
      return 'нечетное';
    }
  };

  // Основа==========================================================================================
  // Функция получает результат баталии камень ножницы бумага циркулярная пила

  const marbleBattle = ([gameWinner, settings]) => {
    // Функция новой игры
    const newGame = () => {
      const again = confirm(settings.messages.again);
      if (again) {
        marbleBattle(window.rps());
      } else {
        return;
      }
    };

    // Определяем кто первый ходит, на основе кол-ва побед в прошлой игре
    if (gameWinner === 'player') {
      alert('Ход игрока');
      const playerBet = prompt(settings.messages.numberOfBalls);
      if (playerBet > playerBalls) {
        alert(`Число не должно превышать ${playerBalls}`);
        return marbleBattle([gameWinner, settings]);
      }
      // определяем четное или нет число у игрока
      const playerChoice = evenOrOdd(playerBet);
      // определяем четное или нет у бота
      const compChoice = evenOrOdd(compAnswer());


      if (playerBet === null || playerBet === '') {
        return alert(settings.messages.cancel);
      } else if (isNaN(playerBet)) {
        alert(settings.messages.invalid);
        return marbleBattle(['player', settings]);
      } else if (playerChoice === compChoice) {
        playerBalls -= +playerBet;
        botBalls += +playerBet;
        alert(`${settings.messages.computer} выбрал ${compChoice}`);
        alert(`Результаты ${settings.messages.computer}: ${botBalls}
        ${settings.messages.player} : ${playerBalls}`);
      } else {
        playerBalls += +playerBet;
        botBalls -= +playerBet;
        alert(`${settings.messages.computer} выбрал ${compChoice}`);
        alert(`Результаты ${settings.messages.computer}: ${botBalls}
        ${settings.messages.player} : ${playerBalls}`);
      }
      // если кто-то продул
      if (botBalls <= 0) {
        return alert('Игра оконечна , компьютер продул');
      } else if (playerBalls <= 0) {
        return alert('Игра окончена. Игрок проиграл все шарики');
      } else {
        return marbleBattle(['bot', settings]);
      }
    } else {
      alert('Ход компа');
      const compBet = getRandom(1, botBalls);
      const compChoice = evenOrOdd(compBet);
      const playerAnswer = prompt(settings.messages.evenOrOdd);
      if (playerAnswer === null || playerAnswer === '') {
        return alert(settings.messages.cancel);
      } else if (playerAnswer === compChoice) {
        playerBalls += compBet;
        botBalls -= compBet;
        alert(`${settings.messages.computer} загадал ${compBet}`);
        alert(`Результаты ${settings.messages.computer}: ${botBalls}
        ${settings.messages.player} : ${playerBalls}`);
      } else {
        playerBalls -= compBet;
        botBalls += compBet;
        alert(`${settings.messages.computer} загадал ${compBet}`);
        alert(`Результаты ${settings.messages.computer}: ${botBalls}
        ${settings.messages.player} : ${playerBalls}`);
      }
      if (botBalls <= 0) {
        alert('Игра оконечно , компьютер продул');
        return newGame();
      } else if (playerBalls <= 0) {
        alert('Игра окончена. Игрок проиграл все шарики');
        return newGame();
      } else {
        return marbleBattle(['player', settings]);
      }
    }
  };
  window.MARBLES = marbleBattle;
})();
