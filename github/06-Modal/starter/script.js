`use strict`;
//DOM elements
const MODAL = document.querySelector(`.modal`);
const OVERLAY = document.querySelector(`.overlay`);
const BUTTON_CLOSED_MODAL = document.querySelector(`.close-modal`);
const BUTTONS_OPEN_MODAL = document.querySelectorAll(`.show-modal`);

//functions
const OPEN_MODAL = () => {
    MODAL.classList.remove(`hidden`);
    OVERLAY.classList.remove(`hidden`);
};
const CLOSE_MODEL = () => {
    MODAL.classList.add(`hidden`);
    OVERLAY.classList.add(`hidden`);
};

//event listeners
for (let i = 0; i < BUTTONS_OPEN_MODAL.length; i++) {
    BUTTONS_OPEN_MODAL[i].addEventListener(`click`, OPEN_MODAL);
}

BUTTON_CLOSED_MODAL.addEventListener(`click`, CLOSE_MODEL);
OVERLAY.addEventListener(`click`, CLOSE_MODEL);

document.addEventListener(`keydown`, e => {
    if (e.key === `Escape` && !MODAL.classList.contains(`hidden`)) {
        CLOSE_MODEL();
    }
});
