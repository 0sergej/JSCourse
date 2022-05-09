'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.querySelector(`#section--1`);
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);

const openModal = function (e) {
    e.preventDefault();

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Button scrolling
btnScrollTo.addEventListener(`click`, function (e) {
    const s1coords = section1.getBoundingClientRect();

    // Scrolling
    // window.scrollTo({
    //     left: s1coords.x + window.scrollY,
    //     top: s1coords.y + window.scrollY,
    //     behavior: `smooth`,
    // });

    section1.scrollIntoView({behavior: `smooth`});
});

///////////////////////////////////////////

// Page navigation

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//     el.addEventListener(`click`, function (e) {
//         e.preventDefault();

//         const id = this.getAttribute(`href`);
//         document.querySelector(id).scrollIntoView({behavior: `smooth`});
//     });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains(`nav__link`)) {
        const id = e.target.getAttribute(`href`);
        document.querySelector(id).scrollIntoView({behavior: `smooth`});
    }
});

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

// // Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector(`.header`);
// const allSections = document.querySelectorAll(`.section`);
// console.log(allSections);

// document.getElementById(`section--1`);
// const allButtons = document.getElementsByTagName(`button`);
// console.log(allButtons);

// console.log(document.getElementsByClassName(`btn`));

// // Creating  and inserting elements
// // .insertAdjacentHTML

// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// message.textContent = `We use cookies for improved functionality and analytics.`;

// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true))

// // header.before(message)
// // header.after(message)

// // Delete elements
// document
//     .querySelector(`.btn--close-cookie`)
//     .addEventListener(`click`, function () {
//         message.remove();

//         // message.parentElement.removeChild(message);
//     });

// // Styles

// message.style.backgroundColor = `#37383d`;
// message.style.width = `106%`;

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//     Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

// document.documentElement.style.setProperty(`--color-primary`, `blue`);

// // Attributes

// const logo = document.querySelector(`.nav__logo`);
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute(`designer`));
// logo.setAttribute(`company`, `Bankist`);

// console.log(logo.src);
// console.log(logo.getAttribute(`src`));

// const link1 = document.querySelector(`.twitter-link`);
// console.log(link1.href);
// console.log(link1.getAttribute(`href`));

// const link2 = document.querySelector(`.nav__link--btn`);

// console.log(link2.href);
// console.log(link2.getAttribute(`href`));

// // Data-attribute

// console.log(logo.dataset.versionNumber);

// // Classes

// logo.classList.add(`c`, `j`);
// logo.classList.remove(`c`, `j`);
// logo.classList.toggle(`c`);
// logo.classList.contains(`c`); // not includes

// // Don't use
// logo.className = `jonas`;

// const btnScrollTo = document.querySelector(`.btn--scroll-to`);
// const section1 = document.querySelector(`#section--1`);

// btnScrollTo.addEventListener(`click`, function (e) {
//     const s1coords = section1.getBoundingClientRect();
//     console.log(s1coords);

//     console.log(e.target.getBoundingClientRect());

//     console.log(`Currnet scroll (X/Y)`, window.scrollX, window.scrollY);

//     console.log(
//         `height/weight viewport`,
//         document.documentElement.clientHeight,
//         document.documentElement.clientWidth
//     );

//     // Scrolling
//     // window.scrollTo({
//     //     left: s1coords.x + window.scrollY,
//     //     top: s1coords.y + window.scrollY,
//     //     behavior: `smooth`,
//     // });

//     section1.scrollIntoView({behavior: `smooth`});
// });

// const h1 = document.querySelector(`h1`);

// const alertH1 = function (e) {
//     alert(`addEventListener: Great!`);
// };

// h1.addEventListener(`mouseenter`, alertH1);

// setTimeout(() => h1.removeEventListener(`mouseenter`, alertH1), 3000);

// // Old way
// // h1.onmouseenter = function (e) {
// //     alert(`addEventListener: Great!`);
// // };

// rgb(255, 255, 255)

// const randomInt = (min, max) => Math.round(Math.random() * (max - min) + min);

// const randomColor = () =>
//     `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(`Link`, e.target, e.currentTarget);
//     console.log(e.currentTarget === this);

//     // Stop propagation
//     // e.stopPropagation();
// });
// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(`List`, e.target, e.currentTarget);
// });

// document.querySelector(`.nav`).addEventListener(`click`, function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(`Nav`, e.target, e.currentTarget);
// });
