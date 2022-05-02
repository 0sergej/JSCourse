'use strict';

// const UD = undefined

// const bookings = [];

// const createBooking = function (flightNum, numPassenger = 1, price = 199 * numPassenger) {
//     //ES5
//     // numPassenger = numPassenger || 1;
//     // price = price || 199;

//     const booking = {
//         flightNum,
//         numPassenger,
//         price,
//     };

//     console.log(booking);
//     bookings.push(booking);
// };

// createBooking(`LH123`);
// createBooking(`LG634`, 2, 800)
// createBooking(`HR352`, 2)
// createBooking(`HR352`, 5)
// createBooking(`LGE542`, UD, 1000)

// const flight = `LH231`;
// const sergej = {
//     fullname: `Sergej Stojanovic`,
//     passport: 213125214,
// };

// const checkIn = function (flightNum, passanger) {
//     flightNum = `LHA999`;
//     passanger.fullname = `Mr. ` + passanger.fullname;

//     if (passanger.passport === 213125214) {
//         alert(`Check in`);
//     } else {
//         alert(`Wrong passport!`);
//     }
// };

// checkIn(flight, sergej);

// console.log(flight, sergej);

// // Is the same as doing...
// const flightNum = flight
// const passanger = sergej

// const newPassport = function(person)
// {
//     person.passport = Math.trunc(Math.random() * 10000000)
// };

// newPassport(sergej);
// checkIn(flight, sergej)

// const oneWord = function (str) {
//     return str.replace(/ /g, ``).toLowerCase();
// };

// const upperFirstWord = function (str) {
//     const [firstWord, ...otherWords] = str.split(` `);
//     return [firstWord.toUpperCase(), ...otherWords].join(` `);
// };

// //higher-order function
// const transformer = function (str, fn) {
//     console.log(`Original string: ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);

//     console.log(`Transformed by: ${fn.name}`);
// };

// transformer(`JavaScript is the best!`, upperFirstWord);
// transformer(`JavaScript is the best!`, oneWord);

// const high5 = function () {
//     console.log(`High`);
// };

// document.body.addEventListener(`click`, high5);

// [`sergej`, `Marko`, `Petar`].forEach(high5);

// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     };
// };

// const greeterHey = greet(`Hey`);

// greeterHey(`Sergej`);
// greeterHey(`Steven`);

// greet(`Hello`)(`Sergej`);

// const greetAr = greeting => name => console.log(`${greeting} ${name}`);

// greetAr(`Hi`)(`Marko`)

// const lufthansa = {
//     airline: `Lufthansa`,
//     iataCode: `LH`,
//     bookings: [],
//     book(flightNum, firstName) {
//         console.log(
//             `${firstName} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
//         );
//         this.bookings.push({
//             flight: `${this.iataCode}${flightNum}`,
//             firstName,
//         });
//     },
// };

// lufthansa.book(342, `Sergej Stojanovic`);
// lufthansa.book(641, `Mike Smith`);

// const eurowinds = {
//     airline: `Eurowinds`,
//     iataCode: `EW`,
//     bookings: [],
// };

// const book = lufthansa.book;

// // DOES NOT WORK
// // book(23, `Sarah Williams`);

// // Call method
// book.call(eurowinds, 23, `Sarah Williams`);
// // console.log(eurowinds);

// book.call(lufthansa, 543, `Petar Stojanovic`);
// // console.log(lufthansa);

// const swiss = {
//     airline: `Swiss Air Lines`,
//     iataCode: `LX`,
//     bookings: [],
// };

// book.call(swiss, 563, `Lazar Randjelovic`);
// // console.log(swiss);

// //Apply method
// const flightData = [2342, `Jorge Cooper`];
// book.apply(swiss, flightData);
// // console.log(swiss);

// book.call(swiss, ...flightData);

// // Bind method

// const bookEW = book.bind(eurowinds);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(43, `Jelena Popovic`);

// const bookEW23 = book.bind(eurowinds, 23);

// bookEW23(`Milan Milanovic`);
// bookEW23(`Marka Cooper`);

// // With Event Listeners

// console.log(`----------------------------`);

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//     console.log(this.airline);
//     this.planes++;
//     console.log(this.planes);
// };
// // lufthansa.buyPlane()

// document
//     .querySelector(`.buy`)
//     .addEventListener(`click`, lufthansa.buyPlane.bind(lufthansa));

// const addTax = (rate, value) => value + value * rate;

// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);

// console.log(addVAT(100));
// console.log(addVAT(23));

// console.log(`___`);

// const tax =
//     (rate, type = `VAT`) =>
//     value =>
//         type === `VAT` ? value - value * 0.23 : value - value * rate;

// const taxVAT = tax(0.2);
// console.log(taxVAT(100));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// const poll = {
//     question: 'What is your favourite programming language?',
//     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//     // This generates [0, 0, 0, 0]. More in the next section 😃
//     answers: new Array(4).fill(0),

//     registerNewAnswer() {
//         const answer = Number(
//             prompt(
//                 `${this.question}\n${this.options.join(
//                     `\n`
//                 )}\n(Write option number)`
//             )
//         );
//         answer < 4 && answer > -1
//             ? this.answers[answer]++
//             : console.log(`Wrong input.`);

//         this.displayResults();
//         this.displayResults(`string`);
//     },

//     displayResults(type = `array`) {
//         if (type === `array`) {
//             console.log(this.answers);
//         } else if (type === `string`) {
//             console.log(`Poll results are ${this.answers.join(`, `)}`);
//         }
//     },
// };

// console.log(`---------I---------`);

// // console.log(poll);
// // poll.registerNewAnswer();
// // console.log(poll);

// console.log(`---------II---------`);

// // document
// // .querySelector(`.poll`)
// // .addEventListener(`click`, poll.registerNewAnswer.bind(poll));

// console.log(`---------III---------`);

// // poll.displayResults(`string`);
// // poll.displayResults(`type`);
// // poll.displayResults(`array`);
// // poll.displayResults();

// console.log(`---------IV---------`);

// poll.displayResults.call({answers: [5, 2, 3]});
// poll.displayResults.call({answers: [5, 2, 3]}, `string`);

// const runOnce = function () {
//     console.log(`This will never run again.`);
// };
// runOnce();

// (function () {
//     console.log(`This will never run again.`);
//     const isPrivate = 23;
// })();

// (() => console.log(`This will never run again.`))();

// {
//     const isPrivate = 23;
//     var notPrivate = 23;
// }

// // console.log(isPrivate);
// console.log(notPrivate);

// const secureBooking = () => {
//     let passengerCount = 0;

//     return function () {
//         passengerCount++;
//         console.log(`${passengerCount} passangers.`);
//     };
// };

// const booker = secureBooking();

// booker();
// booker();
// booker();

let f;

const g = () => {
    const a = 23;
    f = () => {
        console.log(a * 2);
    };
};

const h = () => {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
};

g();
f();
console.dir(f);

h();
f();
console.dir(f);

const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passangers.`);
        console.log(`There are 3 group, each with ${perGroup} passengers.`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// (() => {
//     const header = document.querySelector('h1');
//     header.style.color = 'red';

//     document.querySelector(`body`).addEventListener(`click`, () => {
//         header.style.color = `blue`;
//         setTimeout(() => {
//             location.reload();
//         }, 200);
//     });
// })();
