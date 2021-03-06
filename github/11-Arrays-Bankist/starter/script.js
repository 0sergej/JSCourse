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
const displayMovements = function (sorted = false) {
    // Deletes all movements from UI
    containerMovements.innerHTML = ``;

    // Checks if movements should be sorted
    const movs = sorted
        ? currentAccount.movements.slice().sort((a, b) => b - a)
        : currentAccount.movements;

    // Displays movements
    movs.forEach(mov => {
        const amount = mov;
        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${
            amount > 0 ? `deposit` : `withdrawal`
        }">
            1 ${amount > 0 ? `Deposit` : `Withdrawal`}
        </div>
        <div class="movements__date">${today}</div>
        <div class="movements__value">${amount}???</div>
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
    labelSumIn.textContent = sumIn + `???`;
    labelSumOut.textContent = sumOut + `???`;

    // Adds all deposits together and displays account balance
    currentBalance = sumIn + sumOut;
    labelBalance.textContent = sumIn + sumOut + ` ???`;
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
    labelSumInterest.textContent = int + ` ???`;
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

    // Calls all functions to display relevant data for Account that's logged in
    displayMovements();
    displayBalance();
    displayIntrest();
});

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

// // Close account
// btnClose.addEventListener(`click`, e => {
//     e.preventDefault();

//     // Gets input
//     const closeOwner = inputCloseOwner.value;
//     const closePin = Number(inputClosePin.value);

//     // Check if input is correct
//     if (
//         closeOwner === currentAccount.owner &&
//         closePin === currentAccount.pin
//     ) {
//         // Deletes user account
//         accounts.splice(
//             accounts.find(acc => {
//                 acc.owner === closeOwner && acc.pin === closePin;
//                 return accounts.indexOf(acc);
//             }),
//             1
//         );

//         // Logs out the user
//         containerApp.style.opacity = 0;
//     } else {
//         alert(`Wrong input.`);
//     }

//     // Clears input fields
//     inputCloseOwner.value = ``;
//     inputClosePin.value = ``;
//     inputCloseOwner.blur();
//     inputClosePin.blur();
// });

btnClose.addEventListener(`click`, e => {
    e.preventDefault();

    if (
        inputCloseOwner.value === currentAccount.owner &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            acc => acc.owner === currentAccount.owner
        );

        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }

    inputCloseOwner.value = inputClosePin.value = ``;
});

btnLoan.addEventListener(`click`, e => {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
        // Add movement
        currentAccount.movements.push(amount);

        // Update UI
        displayMovements();
        displayBalance();
    }

    inputLoanAmount.value = ``;
});

let sorted = false;

btnSort.addEventListener(`click`, e => {
    e.preventDefault();

    displayMovements(!sorted);
    sorted = !sorted;
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
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy ????")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far ????

TEST DATA 1: Julia's data [3, 5, 2, 4, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK ????
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
//             : console.log(`Dog number ${i + 1} is still a puppy ????`);
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
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages ????)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK ????
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

GOOD LUCK ????
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

// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === `Jessica Davis`);
// console.log(account);

// let rightAccount;
// for (const acc of accounts) {
//     if (acc.owner === `Jessica Davis`) {
//         rightAccount = acc;
//         break;
//     }
//     console.log(`21`);
// }
// console.log(movements);
// console.log(movements.includes(-130));

// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 1400);
// console.log(anyDeposits);

// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// const deposit = mov => mov > 0;

// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [
//     [
//         [1, 2, 3],
//         [4, [5, 6]],
//     ],
//     7,
//     8,
// ];

// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// const overalBalance = accounts
//     .map(acc => acc.movements)
//     .flat()
//     .reduce((acc, move) => acc + move, 0);
// console.log(overalBalance);

// const overalBalance2 = accounts
//     .flatMap(acc => acc.movements)
//     .reduce((acc, move) => acc + move, 0);
// console.log(overalBalance);

// const owners = [`Ser`, `Em`, `Xac`, `Mark`];
// console.log(owners.sort());
// console.log(owners);

// console.log(movements);
// // console.log(movements.sort());

// // Asc
// // movements.sort((a, b) => {
// //     if (a > b) {
// //         return 1;
// //     }
// //     if (b > a) {
// //         return -1;
// //     }
// // });

// movements.sort((a, b) => a - b);
// console.log(movements);

// // Desc
// // movements.sort((a, b) => {
// //     if (a > b) {
// //         return -1;
// //     }
// //     if (b > a) {
// //         return 1;
// //     }
// // });
// movements.sort((a, b) => b - a);

// console.log(movements);

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// // console.log(x.map(() => 5));

// x.fill(1, 3, 5);
// console.log(x);
// x.fill(1);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// const y = Array.from({length: 7}, () => 1);
// console.log(y);

// const z = Array.from({length: 7}, (_, i) => i + 1);
// console.log(z);

// const randomDiceRolls = Array.from(
//     {length: 100},
//     (cur, i) => (cur = Math.trunc(Math.random() * 6) + 1)
// );

// console.log(randomDiceRolls);

// labelBalance.addEventListener(`click`, () => {
//     const movementsUI = Array.from(
//         document.querySelectorAll(`.movements__value`),
//         el => Number(el.textContent.replace(`???`, ``))
//     );

//     console.log(movementsUI);

//     //  Needs mapping severalty
//     // const movementsUI2 = [...document.querySelectorAll(`.movements__value`)];
//     // console.log(movementsUI2);
// });

// const bankDepositSum = accounts
//     .flatMap(acc => acc.movements)
//     .filter(mov => mov > 0)
//     .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// const numDeposits1000 = accounts
//     .flatMap(acc => acc.movements)
//     .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// let a = 10;
// console.log(++a, a);

// const {deposits, withdrawal} = accounts
//     .flatMap(acc => acc.movements)
//     .reduce(
//         (sums, cur) => {
//             // cur > 0 ? (sums.deposits += cur) : (sums.withdrawal += cur);
//             // return sums;
//             sums[cur > 0 ? `deposits` : `withdrawal`] += cur;
//             return sums;
//         },
//         {deposits: 0, withdrawal: 0}
//     );

// console.log(deposits, withdrawal);

// const convertTitleCase = function (title) {
//     const capitalize = str => str[0].toUpperCase() + str.slice(1);

//     const exceptions = [
//         `a`,
//         `an`,
//         `and`,
//         `the`,
//         `but`,
//         `or`,
//         `on`,
//         `in`,
//         `with`,
//     ];

//     const titleCase = title
//         .toLowerCase()
//         .split(` `)
//         .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//         .join(` `);

//     return capitalize(titleCase);
// };

// console.log(convertTitleCase(`this is a nice title`));
// console.log(convertTitleCase(`this is a LONG title but not too long`));
// console.log(convertTitleCase(`and here is another title with an EXAMPLE`));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion.

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) ????
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

TEST DATA:
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK ????
*/

// TEST DATA
const dogs = [
    {weight: 22, curFood: 250, owners: ['Alice', 'Bob']},
    {weight: 8, curFood: 200, owners: ['Matilda']},
    {weight: 13, curFood: 175, owners: ['Sarah', 'John']},
    {weight: 32, curFood: 340, owners: ['Michael']},
];

console.log(`-----------I-----------`);
dogs.map(dog => (dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28)));

console.log(dogs);

console.log(`-----------II-----------`);

const [sarahDog] = dogs.filter(dog =>
    dog.owners.find(owner => {
        if (owner === `Sarah`) {
            dog.curFood > dog.recommendedFood
                ? console.log(`Sarah's dog is eating to much.`)
                : console.log(`Sarah's dog is eating to little.`);
        }
    })
);

console.log(`-----------III-----------`);

const ownerEatTooMuch = dogs
    .reduce((owner, dog) => {
        dog.curFood > dog.recommendedFood ? owner.push(dog.owners) : owner;
        return owner;
    }, [])
    .flat();

const ownerEatTooLittle = dogs
    .reduce((owner, dog) => {
        dog.curFood < dog.recommendedFood ? owner.push(dog.owners) : owner;
        return owner;
    }, [])
    .flat();

console.log(`-----------IV-----------`);

console.log(
    `${ownerEatTooMuch.join(`'s, `)}${
        ownerEatTooMuch.length > 1 ? `'s dogs are` : `'s dog is`
    } eating too much.`,
    `\n${ownerEatTooLittle.join(`'s, `)}${
        ownerEatTooLittle.length > 1 ? `'s dogs are` : `'s dog is`
    } eating too little.`
);

console.log(`-----------V-----------`);

const ownerEatExactly = dogs.reduce(
    (owner, dog) => (dog.curFood === dog.recommendedFood ? !owner : owner),
    false
);

console.log(ownerEatExactly);

console.log(`-----------VI-----------`);

const ownerEatOkAmount = dogs.reduce(
    (owner, dog) =>
        dog.curFood < dog.recommendedFood * 1.1 &&
        dog.curFood > dog.recommendedFood * 0.9
            ? !owner
            : owner,
    false
);

console.log(ownerEatOkAmount);

console.log(`-----------VII-----------`);

const arrEatOkAmount = dogs.reduce((owner, dog) => {
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
        ? owner.push(dog)
        : owner;
    return owner;
}, []);

console.log(arrEatOkAmount);

console.log(`-----------VIII-----------`);

const [...dogsSortedAsc] = dogs
    .slice()
    .sort((a, b) => b.recommendedFood - a.recommendedFood);

console.log(dogsSortedAsc);
