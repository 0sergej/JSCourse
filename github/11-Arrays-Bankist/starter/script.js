'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseOwner = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// VARIABLES

// Gets date
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
// Creates variable for today's date
today = mm + '/' + dd + '/' + yyyy;

// Updates date
labelDate.textContent = today;

// FUNCTIONS

// Immediate create all useres
(function () {
    accounts.forEach(acc => {
        acc.username = acc.owner
            .toLocaleLowerCase()
            .split(` `)
            .map(word => word[0])
            .join(``);
    });
})();

// Displays all Movements on the main Movements panel
const displayMovements = function () {
    currentAccount.movements.forEach(mov => {
        const amount = mov;
        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${
            amount > 0 ? `deposit` : `withdrawal`
        }">
            1 ${amount > 0 ? `Deposit` : `Withdrawal`}
        </div>
        <div class="movements__date">${today}</div>
        <div class="movements__value">${amount}€</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

// Displays all Deposits, Withdrawals and accounts Balance
const displayBalance = function () {
    let sumIn = 0;
    let sumOut = 0;
    currentAccount.movements.forEach(mov => {
        if (mov > 0) {
            sumIn += mov;
        } else if (mov < 0) {
            sumOut += mov;
        }
    });

    // Updates UI
    labelSumIn.textContent = sumIn + `€`;
    labelSumOut.textContent = sumOut + `€`;

    // Adds all deposits together and displays account balance
    currentBalance = sumIn + sumOut;
    labelBalance.textContent = sumIn + sumOut + ` €`;
};

// Displays Interest on all Deposits
const displayIntrest = function () {
    let int = 0;
    currentAccount.movements.forEach(mov => {
        if (mov > 0) {
            const amount = mov;
            int += (amount * currentAccount.interestRate) / 100;
        }
    });
    labelSumInterest.textContent = int + ` €`;
};

// Transfer money from currentAccount to selected account in transfer form
const transferMoney = function (withdrawl, receiver, deposit) {
    // add withdrawl to currentAccount
    currentAccount.movements.push(-withdrawl);

    // Adds deposit to receiver
    receiver.movements.push(deposit);

    // Updates UI
    displayBalance();
    displayMovements();
};

// TODO Logout Timer

// EVENTS LISTENERS

// Creates an currentAccount variable so it can be used later in funcions
let currentAccount;
let currentBalance;

// User Log in
btnLogin.addEventListener(`click`, e => {
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    // Checks if INput is correct
    const validUsername = inputLoginUsername.value === currentAccount?.username;
    const validPin = Number(inputLoginPin.value) === currentAccount?.pin;
    if (validUsername && validPin) {
        containerApp.style.opacity = 1;
    } else {
        alert(`Wrong username or password.`);
    }

    // Clears input fields
    inputLoginUsername.value = ``;
    inputLoginPin.value = ``;
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Calls all functions for Account that logged in
    displayMovements();
    displayBalance();
    displayIntrest();
});

// TODO Sort
btnSort.addEventListener(`click`, () => {});

// Transfer money
btnTransfer.addEventListener(`click`, e => {
    e.preventDefault();

    const receiverText = inputTransferTo.value;
    const receiverAmount = Number(inputTransferAmount.value);

    const receiverAcc = accounts.find(acc => acc.username === receiverText);

    // Checks if input is correct
    const receiverValid = receiverAcc && receiverAcc !== currentAccount;
    if (receiverValid && currentBalance >= receiverAmount) {
        transferMoney(receiverAmount, receiverAcc, receiverAmount);
    } else {
        alert(`Wrong input.`);
    }

    // Clears input fields
    inputTransferTo.value = ``;
    inputTransferAmount.value = ``;
    inputTransferAmount.blur();
    inputTransferTo.blur();
});

// TODO Request Loan

// Close account
btnClose.addEventListener(`click`, e => {
    e.preventDefault();

    // Gets input
    const closeOwner = inputCloseOwner.value;
    const closePin = Number(inputClosePin.value);

    // Check if input is correct
    if (
        closeOwner === currentAccount.owner &&
        closePin === currentAccount.pin
    ) {
        // Deletes user account
        accounts.splice(
            accounts.find(acc => {
                acc.owner === closeOwner && acc.pin === closePin;
                return accounts.indexOf(acc);
            }),
            1
        );

        // Logs out the user
        containerApp.style.opacity = 0;
    } else {
        alert(`Wrong input.`);
    }

    // Clears input fields
    inputCloseOwner.value = ``;
    inputClosePin.value = ``;
    inputCloseOwner.blur();
    inputClosePin.blur();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = [`a `, `b`, `c`, `d`, `e`];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// console.log(`________________`);
// // console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr.splice(1, 2));
// console.log(arr);

// console.log(`________________`);
// arr = [`a `, `b`, `c`, `d`, `e`];
// const arr2 = [`j`, `i`, `h`, `g`, `f`];
// console.log(arr2.reverse());
// console.log(arr2);

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// console.log(letters.join(`-`));

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-2))

// console.log(`Sergej`.at(-1))

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//     movement > 0
//         ? console.log(`Movement ${i + 1}. You deposited ${movement}.`)
//         : console.log(`Movement ${i + 1}. You withdraw ${Math.abs(movement)}.`);
// }

// console.log(`___________`);

// movements.forEach((mov, i, arr) => {
//     mov > 0
//         ? console.log(`Movement ${i + 1}. You deposited ${mov}.`)
//         : console.log(`Movement ${i + 1}. You withdraw ${Math.abs(mov)}.`);
// });

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//     console.log(`${key}:  ${value}`);
// });

// const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
// console.log(currenciesUnique);

// currenciesUnique.forEach((value, _, set) => {
//     console.log(`${value}:  ${value}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 4, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (arrJulia, arrKate) {
//     const correctedArrJulia = arrJulia.slice(2, -2);

//     const mergedArr = [...correctedArrJulia, ...arrKate];
//     // const mergedArr = correctedArrJulia.concat(arrKate);
//     mergedArr.forEach((age, i) => {
//         age >= 3
//             ? console.log(
//                   `Dog number ${i + 1} is an adult, and is ${age} years old`
//               )
//             : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     });
// };
// const JuliaData1 = [3, 5, 2, 4, 12, 7];
// const KateData1 = [4, 1, 15, 8, 3];

// const JuliaData2 = [9, 16, 6, 8, 3];
// const KateData2 = [10, 5, 6, 1, 4];

// checkDogs(JuliaData1, KateData1);
// console.log(`__________`);
// checkDogs(JuliaData2, KateData2);

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(function (mov) {
//     return mov * eurToUsd;
// });

// console.log(movements, movementsUSD);

// const movementsUSDfor = [];
// for (const mov of movements) {
//     movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// const movementsUSDAr = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSDAr);

// const movementsDescriptions = movements.map((mov, i) => {
//     return `Movement ${i + 1}. You ${
//         (mov > 0 && `deposited`) || `withdraw`
//     } ${mov}`;
// });

// console.log(movementsDescriptions);

// const deposits = movements.filter(mov => mov > 0);
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) mov > 0 && depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);

// console.log(withdrawals);

// console.log(movements);

// const balance = movements.reduce(function (ac, cur, i, arr) {
//     console.log(`Iteration ${i}: ${ac}`);
//     return ac + cur;
// }, 0);

// const balanceAr = movements.reduce((ac, cur) => ac + cur, 0);

// // console.log(balance);
// console.log(balanceAr);

// let balance2 = 0;
// for (const mov of movements) {
//     balance2 += mov;
// }
// console.log(balance2);

// const max = movements.reduce((ac, mov) => {
//     if (ac > mov) {
//         return ac;
//     } else if (ac <= mov) {
//         return mov;
//     }
// }, movements[0]);

// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//     let humanAge = ages
//         .map(dogAge => {
//             return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//         })
//         .filter(v => v >= 18)
//         .reduce((av, v, i, arr) => {
//             return av + v / arr.length ;
//         }, 0);

//     return humanAge;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * eurToUsd)
//     .reduce((acc, mov) => (acc = mov), 0);

//     console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//     let humanAge = ages
//         .map(dogAge => {
//             return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//         })
//         .filter(v => v >= 18)
//         .reduce((av, v, i, arr) => {
//             return av + v / arr.length ;
//         }, 0);

//     return humanAge;
// };

// const firstWithDrawl = movements.find(move => move < 0);

// console.log(movements);
// console.log(firstWithDrawl);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === `Jessica Davis`);
// console.log(account);

// for (const {owner, otherProperties} of accounts) {
//     if (owner === `Jessica Davis`) {
//         console.log(account);
//     }
// }
