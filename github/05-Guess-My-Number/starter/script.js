`use strict`;

//DOM elements
const MESSAGE = document.querySelector(`.message`);
const NUMBER = document.querySelector(`.number`);
const SCORE = document.querySelector(`.score`);
const HIGHSCORE = document.querySelector(`.highscore`);
const INPUT_FIELD = document.querySelector(`.guess`);
const BUTTON_CHECK = document.querySelector(`.check`);
const BUTTON_AGAIN = document.querySelector(`.again`);
const BODY = document.querySelector(`body`);

//APP variables
let _SECRET_NUMBER = Math.trunc(Math.random() * 20 + 1);
let _score = 20;
let _highScore = 0;

// functions
const DISPLAY_MESSAGE = message => {
    MESSAGE.textContent = message;
};
const KEEP_TRACK_OF_SCORE = () => {
    _score--;
    SCORE.textContent = _score;
};

//CHANGING DOM elements
SCORE.textContent = _score;

//EVENT LISTENERS / GAME LOGIC

BUTTON_CHECK.addEventListener(`click`, () => {
    const guess = Number(INPUT_FIELD.value);

    //if played has no input
    if (!guess) {
        DISPLAY_MESSAGE(`No number!`);
    }

    //if player wins
    else if (guess === _SECRET_NUMBER) {
        NUMBER.textContent = _SECRET_NUMBER;

        DISPLAY_MESSAGE(`Correct Number!`);

        BODY.style.backgroundColor = `#60b347`;
        NUMBER.style.width = `30rem`;

        if (_score > _highScore) {
            _highScore = _score;
            HIGHSCORE.textContent = _highScore;
        }
        _score = 20;
    }

    //if player's guess is wrong
    else if (guess !== _SECRET_NUMBER) {
        //if player has more guesses
        if (_score > 1) {
            DISPLAY_MESSAGE(guess < _SECRET_NUMBER ? `Too low!` : `Too High!`);
            KEEP_TRACK_OF_SCORE();
        }
        //if player has no more guesses
        else {
            KEEP_TRACK_OF_SCORE();
            DISPLAY_MESSAGE(`You lost the game!`);
        }
    }
});

BUTTON_AGAIN.addEventListener(`click`, () => {
    DISPLAY_MESSAGE(`Start guessing...`);
    BODY.style.backgroundColor = `#222`;
    NUMBER.style.width = `15rem`;
    NUMBER.textContent = `?`;
    _score = 20;
    SCORE.textContent = _score;
    _SECRET_NUMBER = Math.trunc(Math.random() * 20 + 1);
});
