'use strict';

const btnAgain = document.querySelector('.btn-again');
const btnGuess = document.querySelector('.btn-guess');
const txtMessage = document.querySelector('.message');
const guessNumber = document.querySelector('.guess');
const showNumber = document.querySelector('.number');
const showScore = document.querySelector('.score');
const showHighscore = document.querySelector('.highscore');
const winnerStat = document.querySelector('body');

let score, highscore, secretNumber, playing;

highscore = 0;
// Initialize Game
const init = () => {
  score = 20;
  playing = true; //logic if game ended or not
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};
// Reset
const reset = () => {
  init();
  displayMessage('Start Guessing');
  showScore.textContent = 0;
  showNumber.textContent = '?';
  guessNumber.value = '';
  winnerStat.classList.remove('winner');
  winnerStat.classList.remove('lost');
  //   console.log(secretNumber);
};
init();

// console.log(secretNumber);

const displayMessage = (message) => {
  txtMessage.textContent = message;
};
// Check Button
btnGuess.addEventListener('click', function () {
  // If game ended Check button cant be clicked and again
  // button needed to be clicked to play again
  if (playing) {
    const guess = Number(guessNumber.value);
    // When player inputs not a number or none
    if (!guess) {
      txtMessage.textContent = 'No number!';
    }
    //   When player guessed the number right
    else if (guess === secretNumber) {
      playing = false;
      displayMessage('You guessed it');
      showNumber.textContent = secretNumber;
      winnerStat.classList.add('winner');
      if (score > highscore) {
        highscore = score;
        showHighscore.textContent = highscore;
      }
    }
    //   When player guessed it wrong
    else if (guess !== secretNumber) {
      // if score is more than 1
      if (score > 1) {
        score--;
        showScore.textContent = `${score}`;
        // If guess is too high or too low
        displayMessage(guess > secretNumber ? 'Too high' : 'Too low');
      }
      // If score reaches zero or less than one
      else {
        displayMessage('You lost');
        showScore.textContent = 0;
        winnerStat.classList.add('lost');
        playing = false;
      }
    }
  }
});
// Again Button: Resets the game
btnAgain.addEventListener('click', reset);
