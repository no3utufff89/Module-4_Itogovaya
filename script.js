'use strict';
const startGame = window.rps;
const marbleStart = window.MARBLES;
const lang = prompt('Введите EN или ENG для смены языка, или отмена');
marbleStart(startGame(lang));
// startGame(lang);

