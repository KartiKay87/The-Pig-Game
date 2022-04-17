'use strict';

//Creating a random number between 1 and 6
const randomize = function () {
  return Math.trunc(Math.random() * 6) + 1;
  //random contains 0 but not 1;
};

//Instructions module
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closingModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

document.querySelector('.close-modal').addEventListener('click', closingModal);
overlay.addEventListener('click', closingModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closingModal();
  }
});

//Initializing scores
let currScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playable = true;
let newPlayer = 1;

//Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Selecting Buttons
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const instructions = document.querySelector('.btn--instructions');

//Initializing function
const init = function () {
  playable = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore = 0;
  scores = [0, 0];
  diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  if (!diceEl.classList.contains('hidden')) {
    diceEl.classList.add('hidden');
  }
  newPlayer = newPlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = newPlayer;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
init();
//Switch Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Dice Roll
btnRoll.addEventListener('click', function () {
  if (playable) {
    diceEl.classList.remove('hidden');
    const useless = randomize();
    document.querySelector('.dice').src = 'dice-' + useless + '.png';
    currScore += useless;
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
    if (useless === 1) {
      switchPlayer();
    }
  }
});
//holding the score
btnHold.addEventListener('click', function () {
  if (playable) {
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playable = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

instructions.addEventListener('click', openModal);
