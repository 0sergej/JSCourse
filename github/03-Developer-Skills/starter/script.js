// Remember, we`re gonna use strict mode in all scripts now!
`use strict`;

/*
///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);


const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
console.log(temperatures);

const CALC_TEMP_AMPLITUDE = temperatures => {
    let min = 100;
    let max = -100;

    for (let i = 0; i < temperatures.length; i++) {
        if (typeof temperatures[i] !== `number`) {
            continue;
        }

        if (temperatures[i] < min) {
            min = temperatures[i];
            continue;
        } else if (temperatures[i] > max) {
            max = temperatures[i];
        }
    }

    const OLD_TEMPERATURES = temperatures.slice();

    temperatures.push(min, max);

    console.log(min);
    console.log(max);
    console.log(OLD_TEMPERATURES);
    console.log(temperatures);
};

CALC_TEMP_AMPLITUDE(temperatures);

///////////////////////////////////////

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
console.log(temperatures);

const CALC_TEMP_AMPLITUDE = temperatures => {
    let min = 100;
    let max = -100;

    for (let i = 0; i < temperatures.length; i++) {
        if (typeof temperatures[i] !== `number`) {
            continue;
        }
        if (temperatures[i] < min) {
            min = temperatures[i];
            continue;
        } else if (temperatures[i] > max) {
            max = temperatures[i];
        }
    }

    const OLD_TEMPERATURES = temperatures.slice();

    temperatures.push(min, max);

    console.log(min);
    console.log(max);
    console.log(OLD_TEMPERATURES);
    console.log(temperatures);
};

CALC_TEMP_AMPLITUDE(temperatures);

///////////////////////////////////////

// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]


const temperatures = [12, 5, -5, 0, 4];

const printForecast = arr => {
    let days = 0;
    let str = `... `;

    for (let i = 0; i < arr.length; i++) {
        days++;

        str += `${arr[i]}ºC in ${days} days ... `;
    }

    console.log(str);
};

console.log(temperatures);
printForecast(temperatures);

*/