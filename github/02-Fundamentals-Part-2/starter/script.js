`use strict`;

/*
///////////////////////////////////////
// Activating Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio';
// const private = 534;
///////////////////////////////////////
// Functions
function logger() {
  console.log('My name is Jonas');
}

// calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number('23');

function calculateAge(birthYear)
{
    return 2037 - birthYear;
}

const AGE_1 = calculateAge(1991);
console.log(AGE_1);

const calculateAge2 = function (birthYear)
{
    return 2037 - birthYear;
}

const AGE_2 = calculateAge2(1991);

console.log(AGE_2);
///////////////////////////////////////
// Function Declarations vs. Expressions

// Function declaration
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
const age2 = calcAge2(1991);

console.log(age1, age2);


///////////////////////////////////////
// Arrow functions

const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Jonas')); console.log(yearsUntilRetirement(1980, 'Bob'));


///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));


///////////////////////////////////////

// Reviewing Functions
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}

const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));
*/

///////////////////////////////////////
// Coding Challenge #1

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀

const DOLPHINS = [85, 54, 41];
const KOALAS = [23, 34, 27];

const calcAverage = scores => {
    let averageScore = 0;

    for (let i = 0; i < scores.length; i++) {
        averageScore += scores[i];

        if (i === scores.length - 1) {
            averageScore = averageScore / scores.length;
        }
    }
    return averageScore;
};

const declareWinner = (avgDolhins, avgKoalas) => {
    if (avgDolhins >= 2 * avgKoalas) {
        const WINNER_TEAM = `team Dolphins (${avgDolhins} vs. ${avgKoalas})`;
        return WINNER_TEAM;
    } else if (avgKoalas >= 2 * avgDolhins) {
        const WINNER_TEAM = `team Koalas (${avgKoalas} vs. ${avgDolphins})`;
        return WINNER_TEAM;
    }
    return false;
};

const DOLPHINS_AVERAGE = calcAverage(DOLPHINS);
const KOALAS_AVERAGE = calcAverage(KOALAS);

const WINNER = declareWinner(DOLPHINS_AVERAGE, KOALAS_AVERAGE);
console.log(`Winner is ${WINNER != false ? WINNER : `nobody`}.`);

///////////////////////////////////////

// Introduction to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


///////////////////////////////////////

// Basic Array Operations (Methods)
const friends = ['Michael', 'Steven', 'Peter'];

// Add elements
const newLength = friends.push('Jay');
console.log(friends);
console.log(newLength);

friends.unshift('John');
console.log(friends);

// Remove elements
friends.pop(); // Last
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // First
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));

if (friends.includes('Steven')) {
  console.log('You have a friend called Steven');
}
*/

///////////////////////////////////////
// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀

const CALCULATE_TIP = BILL =>
{
  if(BILL >= 50 && BILL <= 300)
  {
    return BILL * 0.15;
  }
  return BILL * 0.20;
};

const TIPS = [CALCULATE_TIP(125), CALCULATE_TIP(555), CALCULATE_TIP(44)];

const TOTAL = [TIPS[0] + 125, TIPS[1] + 555, TIPS[2] + 44];

console.log(`Total bill is ${TOTAL[1]}, and tip amount is ${TIPS[1]}.`);

console.log(TOTAL, TIPS)

const SERGEJ = {
    FIRST_NAME: `Sergej`,
    LAST_NAME: `Stojanovic`,
    AGE: 2037 - 2003,
    JOB: `programmer`,
    FRIENDS: ['Michael', 'Steven', 'Peter'],
};

console.log(SERGEJ);

console.log(SERGEJ.LAST_NAME);
console.log(SERGEJ[`LAST_NAME`]);

const NAME_KEY = `_NAME`;

console.log(SERGEJ[`FIRST` + NAME_KEY]);
console.log(SERGEJ[`LAST` + NAME_KEY]);

// const INTRESTED_IN = prompt(
//     `What do you want to know about Sergej? Choose between FIRST_NAME, LAST_NAME, AGE, JOB, FRIENDS`
// );

// if (SERGEJ[INTRESTED_IN]) {
//     console.log(SERGEJ[INTRESTED_IN]);
// } else {
//     console.log(
//         `Wrong Request. 
//     What do you want to know about Sergej? Choose between FIRST_NAME, LAST_NAME, AGE, JOB, FRIENDS`
//     );
// }

SERGEJ.LOCATION = `Belgrade`;
SERGEJ[`TWITTER`] = `@Es0gR`;

console.log(SERGEJ);

console.log(`${SERGEJ.FIRST_NAME} has ${SERGEJ.FRIENDS.length} friends and his best friend is ${SERGEJ.FRIENDS[0]}.`);

///////////////////////////////////////
// Introduction to Objects
const jonasArray = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven']
];

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};


///////////////////////////////////////
// Dot vs. Bracket Notation
const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  age: 2037 - 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);

console.log(jonas.lastName);
console.log(jonas['lastName']);

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

// console.log(jonas.'last' + nameKey)

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends');

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log('Wrong request! Choose between firstName, lastName, age, job, and friends');
}

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

// Challenge
// "Jonas has 3 friends, and his best friend is called Michael"
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);


///////////////////////////////////////
// Object Methods

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYeah: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true,

  // calcAge: function (birthYeah) {
  //   return 2037 - birthYeah;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYeah;
  // }

  calcAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
  }
};

console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// Challenge
// "Jonas is a 46-year old teacher, and he has a driver's license"
console.log(jonas.getSummary());

///////////////////////////////////////

// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

GOOD LUCK 😀

const MARK = {
  FULL_NAME: 'Mark Miller',
  MASS: 78,
  HEIGHT: 1.69,

  calcBMI: function () {
    this.BMI = this.MASS / this.HEIGHT ** 2;
    return this.BMI
  }
};

const JOHN = {
  FULL_NAME: 'John Smith',
  MASS: 92,
  HEIGHT: 1.95,
  
  calcBMI: function () {
    this.BMI = this.MASS / this.HEIGHT ** 2;
    return this.BMI
  }
};

MARK.calcBMI();
JOHN.calcBMI();

console.log(`${MARK.BMI > JOHN.BMI ? MARK.FULL_NAME : JOHN.FULL_NAME}'s BMI (${MARK.BMI > JOHN.BMI ? MARK.BMI : JOHN.BMI}) is higher than ${MARK.BMI > JOHN.BMI ? JOHN.FULL_NAME : MARK.FULL_NAME}'s BMI (${MARK.BMI > JOHN.BMI ? JOHN.BMI : MARK.BMI}).`)

///////////////////////////////////////
// Iteration: The for Loop

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

///////////////////////////////////////

// Looping Arrays, Breaking and Continuing
const jonas = [
  'Jonas',
  'Schmedtmann',
  2037 - 1991,
  'teacher',
  ['Michael', 'Peter', 'Steven'],
  true
];
const types = [];

// console.log(jonas[0])
// console.log(jonas[1])
// ...
// console.log(jonas[4])
// jonas[5] does NOT exist

for (let i = 0; i < jonas.length; i++) {
  // Reading from jonas array
  console.log(jonas[i], typeof jonas[i]);

  // Filling types array
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break
console.log('--- ONLY STRINGS ---')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;

  console.log(jonas[i], typeof jonas[i]);
}

console.log('--- BREAK WITH NUMBER ---')
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === 'number') break;

  console.log(jonas[i], typeof jonas[i]);
}


///////////////////////////////////////

const JONAS = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven'],
    true,
];

for (let i = JONAS.length; i >= 0; i--) {
    console.log(i, JONAS[i]);
}

for (let exercise = 1; exercise < 3; exercise++) {
  console.log(`---- STARTING EXERCISE ${exercise} ----`);
  
  for (let rep = 1; rep < 11; rep++)
  {
    console.log(`Lifting  weight repetition ${rep}.`);
  }
}

let rep = 1

while (rep <= 10)
{
  console.log(`Lifting  weight repetition ${rep}.`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6)
{
  dice = Math.trunc(Math.random() * 6) + 1;
  console.log(`Your rolled a ${dice}.`);
}

///////////////////////////////////////
// Coding Challenge #4

Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀

const BILLS = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const calcAverage = arr => {
    let average = 0;
    for (let i = 0; i < arr.length; i++) {
        average += arr[i];
        if (i === arr.length - 1) {
            average = average / arr.length;
            console.log(`The average of the array is ${average}.`);
        }
    }
};

let TIPS = [];
let TOTAL = [];

for (let i = 0; i < BILLS.length; i++) {
    if (BILLS[i] >= 50 && BILLS[i] < 200) {
        TIPS[i] = BILLS[i] * 0.15;
        TOTAL[i] = BILLS[i] + TIPS[i];
    } else {
        TIPS[i] = BILLS[i] * 0.2;
        TOTAL[i] = BILLS[i] + TIPS[i];
    }
}

console.log(`Bills:
${BILLS},
 Tips:
 ${TIPS},
 Totals:
 ${TOTAL}.`);

calcAverage(TOTAL);

*/
