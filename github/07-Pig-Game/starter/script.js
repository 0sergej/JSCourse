`use strict`;

//DOM elements
const player0 = document.querySelector(`.player--0`);
const player1 = document.querySelector(`.player--1`);
const score0 = document.getElementById(`score--0`);
const score1 = document.getElementById(`score--1`);
const currentScore0 = document.getElementById(`current--0`);
const currentScore1 = document.getElementById(`current--1`);
const dice = document.querySelector(`.dice`);
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector(`.btn--hold`);
const buttonNew = document.querySelector(`.btn--new`);

//APP elements
let _player0 = true;
let _currentScore0 = 0;
let _currentScore1 = 0;

//DOM VALUES
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add(`hidden`);

//FUNCTIONS
const TOGGLE_PLAYER = () => {
    player0.classList.toggle(`player--active`);
    player1.classList.toggle(`player--active`);

    _player0 = !_player0;
};
const RESET_SCORE_0 = () => {
    _currentScore0 = 0;
    currentScore0.textContent = 0;
};
const RESET_SCORE_1 = () => {
    _currentScore1 = 0;
    currentScore1.textContent = 0;
};

//EVENT LISTENERS // GAME LOGIC

//rolling dice
buttonRoll.addEventListener(`click`, () => {
    //generate a random number
    const _dice = Math.trunc(Math.random() * 6 + 1);

    //display dice
    dice.classList.remove(`hidden`);
    dice.src = `dice-${_dice}.png`;

    //check if dice is 1
    if (_dice !== 1) {
        //add dice to current score

        //add dive to player0
        if (_player0) {
            _currentScore0 += _dice;
            currentScore0.textContent = _currentScore0;
        }
        //add dice to player1
        else {
            _currentScore1 += _dice;
            currentScore1.textContent = _currentScore1;
        }
    }
    //switch player
    else {
        if (_player0) {
            TOGGLE_PLAYER();
            RESET_SCORE_0();
        } else {
            TOGGLE_PLAYER();
            RESET_SCORE_1();
        }
    }
});

buttonHold.addEventListener(`click`, () => {
    //add current score to player score
    if (_player0) {
        score0.textContent = Number(score0.textContent) + _currentScore0;
        RESET_SCORE_0();
    } else {
        score1.textContent = Number(score1.textContent) + _currentScore1;
        RESET_SCORE_1();
    }

    //check if player won
    if (score0.textContent >= 10) {
        player0.classList.add(`player--winner`);
        exit;
    } else if (score1.textContent >= 10) {
        player1.classList.add(`player--winner`);
        exit;
    }

    TOGGLE_PLAYER();
});

buttonNew.addEventListener(`click`, () => {
    //resets all scores
    RESET_SCORE_0();
    RESET_SCORE_1();

    score0.textContent = 0;
    score1.textContent = 0;

    //sets player0 to active
    _player0 = true;
    player0.classList.add(`player--active`);
    player1.classList.remove(`player--active`);

    dice.classList.add(`hidden`);

    //removes winner class
    player0.classList.remove(`player--winner`);
    player1.classList.remove(`player--winner`);
});
