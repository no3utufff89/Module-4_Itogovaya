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
    even: 'even',
    odd: 'odd',

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
    even: 'четное',
    odd: 'нечетное',
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
  const getPlayerMove = (settings) => {
    const playerFigure = prompt(settings.messages.move);
    if (playerFigure === null || playerFigure === '') {
      alert('Отмена');
      return false;
    } else if (settings.figures.indexOf(playerFigure) === -1) {
      alert(settings.messages.invalid);
      return false;
    } else {
      return playerFigure;
    }
  };

  const compareRes = (playerFigure, botFigure, settings) => {
    if (playerFigure === botFigure) {
      alert(`Компьютер показал: ${botFigure} Игрок показал: ${playerFigure}`);
      alert(settings.messages.tie);
      return 'tie';
    } else if ((botFigure === settings.figures[0] && playerFigure === settings.figures[2]) ||
        (botFigure === settings.figures[1] && playerFigure === settings.figures[0]) ||
        (botFigure === settings.figures[2] && playerFigure === settings.figures[1])) {
      alert(`Компьютер показал: ${botFigure} Игрок показал: ${playerFigure}`);
      alert(settings.messages.win);
      return 'win';
    } else {
      alert(`Компьютер показал: ${botFigure} Игрок показал: ${playerFigure}`);
      alert(settings.messages.lose);
      return 'lose';
    }
  };
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
  // ОСНОВА ==============================================
  const game = (lang) => {
    // Конструируем результаты
    const result = new Result(0, 0);
    // Конструируем языковой объект
    const settings = createObject(lang);


    // Делаеем ходы
    const start = (settings) => {
      // запускаем функцию хода компа
      const botFigure = getBotFigure(settings);

      // запускаем функцию хода игрока
      const playerFigure = getPlayerMove(settings);
      if (playerFigure === false) {
        return;
      }


      // Все походили, пора сравнить фигуры
      const checkResult = compareRes(playerFigure, botFigure, settings);

      if (checkResult === 'lose') {
        result.setComputerResult = 1;
      } else if (checkResult === 'win') {
        result.setPlayerRes = 1;
      } else if (checkResult === 'tie') {
        alert('Ничья не сработает');
        start(settings);
      } else if (playerFigure === null || playerFigure === undefined) {
        return;
      }
      return result;
    };
    start(settings);
    const getWinner = (result) => {
      let gameWinner;
      if (result.player === result.computer) {
        return false;
      } else if (result.player > result.computer) {
        alert('Первым ходит игрок, потому что он умничка');
        return gameWinner = 'player';
      } else if (result.player < result.computer) {
        alert('Первым ходит компьютер, потому что игрок безрукое чмо');
        return gameWinner = 'bot';
      }
    };
    const gameWinner = getWinner(result);
    return [gameWinner, settings];
  };
  window.rps = game;
})();

(() => {
// Получаем случайное число в заданном диапозоне
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Фунция получения ответа от бездушной машины. Привет Atomic Heart.
  const botAnswer = () => getRandom(1, 2);

  // Четное или нет число
  const evenOrOdd = (num) => {
    if (num % 2) {
      return 'четное';
    } else {
      return 'нечетное';
    }
  };

  // Класс конструктор шариков этих уже вонючих
  class Balls {
    constructor(playerBalls, botBalls) {
      this.playerBalls = playerBalls;
      this.botBalls = botBalls;
    }
    get getPlayerBalls() {
      return this.playerBalls;
    }
    get getBotBalls() {
      return this.botBalls;
    }
    set setPlayerBalls(bet) {
      return this.playerBalls += bet;
    }
    set setBotBalls(bet) {
      return this.botBalls += bet;
    }
    set setNewPlayerBalls(bet) {
      return this.playerBalls = bet;
    }
    set setNewBotBalls(bet) {
      return this.botBalls = bet;
    }
  }

  // Ходы игрока
  // 1) Ввод числа шариков
  const playerNumber = (balls) => {
    const playerBet = +prompt('Сколько шариков загадываете?');
    return playerBet;
  };
  // 2)Ввод текста четное/нечетное
  const playerText = () => {
    const playerAnswer = prompt('Введите четное / нечетное');
    if (playerAnswer === null) {
      return alert('Отмена ввода четное / нечетное');
    } else {
      return playerAnswer;
    }
  };

  // Собираем объект с шариками
  const balls = new Balls(5, 5);
  // Основная функция игры
  const marbleBattle = ([gameWinner, settings]) => {
    // Начало новой игры, заново играем в RPS
    const newGame = () => {
      const again = confirm(settings.messages.again);
      if (again) {
        balls.setNewBotBalls = 5;
        balls.setNewPlayerBalls = 5;
        marbleBattle(window.rps());
        console.log(balls);
      } else {
        return;
      }
    };
    if (gameWinner === false) {
      alert('Отмена марблы');
      return;
    } // Если Ход игрока
    if (gameWinner === 'player') {
      const playerBet = playerNumber(balls);
      if (Number.isNaN(playerBet)) {
        alert('Не число');
        return marbleBattle(['player', settings]);
      } else if (playerBet === 0) {
        alert('Не может ставка быть ноль!!!');
        return marbleBattle(['player', settings]);
      } else if (playerBet > balls.getPlayerBalls) {
        alert(`Нельзя поставить больше чем у тебя есть, а есть у тебя ${balls.getPlayerBalls}`);
        return marbleBattle(['player', settings]);
      }
      const playerChoice = evenOrOdd(playerBet);
      const compChoice = evenOrOdd(botAnswer());
      // Условия
      if (playerChoice === compChoice) {
        balls.setPlayerBalls = playerBet;
        balls.setBotBalls = -playerBet;
        alert(`${settings.messages.computer} выбрал ${compChoice}`);
        // alert(`Статистика Игрок = ${balls.getPlayerBalls} / Бот = ${balls.getBotBalls}`);
        console.log(balls);
      } else {
        balls.setPlayerBalls = -playerBet;
        balls.setBotBalls = playerBet;
        alert(`${settings.messages.computer} выбрал ${compChoice}`);
        // // alert(`Статистика Игрок = ${balls.getPlayerBalls} / Бот = ${balls.getBotBalls}`);
        console.log(balls);
      } // если кто-то продул
      if (balls.getBotBalls <= 0) {
        alert('Игра оконечна , компьютер продул');
        newGame();
      } else if (balls.getPlayerBalls <= 0) {
        alert('Игра окончена. Игрок проиграл все шарики');
        newGame();
      } else {
        marbleBattle(['bot', settings]);
      }
    } else {
      alert('Ход компа');
      console.log('Теперь бот');
      const compBet = getRandom(1, balls.getBotBalls);
      const compChoice = evenOrOdd(compBet);
      const playerAnswer = playerText();
      if (playerAnswer === compChoice) {
        balls.setPlayerBalls = -compBet;
        balls.setBotBalls = compBet;
        alert(`${settings.messages.computer} загадал ${compBet}`);
        // alert(`Статистика Игрок = ${balls.getPlayerBalls} / Бот = ${balls.getBotBalls}`);
        console.log(balls);
      } else {
        balls.setPlayerBalls = -compBet;
        balls.setBotBalls = compBet;
        alert(`${settings.messages.computer} загадал ${compBet}`);
        // alert(`Статистика Игрок = ${balls.getPlayerBalls} / Бот = ${balls.getBotBalls}`);
        console.log(balls);
      }
      if (balls.getBotBalls <= 0) {
        alert('Игра оконечна , компьютер продул');
        newGame();
      } else if (balls.getPlayerBalls <= 0) {
        alert('Игра окончена. Игрок проиграл все шарики');
        newGame();
      } else {
        marbleBattle(['player', settings]);
      }
    }

    console.log(balls);
    console.log(`Первым ходит ${gameWinner}`);
  };
  window.MARBLES = marbleBattle;
})();
