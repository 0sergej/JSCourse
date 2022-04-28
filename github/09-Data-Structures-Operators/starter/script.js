'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    [weekdays[5]]: {
        open: 0, // Ope 24 hours
        close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
    Rname: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours,

    order(startedIndex, mainIndex) {
        return [this.starterMenu[startedIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery({starterIndex = 1, mainIndex = 0, time = `20:00`, address}) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(
            `Here is some declicious pasta with ${ing1}, ${ing2} and ${ing3}`
        );
    },

    orderPizza(mainIngredient, ...otherIngredients) {
        console.log(mainIngredient, otherIngredients);
    },
};

/*
//////////////////////////////////
Destructuring Objects

restaurant.orderDelivery({
    time: `22:30`,
    address: `Via del Sole, 21`,
    mainIndex: 2,
    starterIndex: 2,
});

restaurant.orderDelivery({
    address: `Via del Sole, 21`,
    starterIndex: 3,
});

//////////////////////////////////
Destructuring Arrays

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, c);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// const temp = main;

// main = secondary;
// secondary = temp;
// console.log(main, secondary)

[main, secondary] = [secondary, main];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];

// const [i, , j] = nested;
// console.log(i, j)

const [i, , [, j]] = nested;
console.log(i, j);
const [p = 1, q = 1, r = 1] = [9];

console.log(p, q, r);

//////////////////////////////////
Destructuring Objects

const {Rname, openingHours, categories} = restaurant;
console.log(Rname, openingHours, categories);

const {
    Rname: restourantName,
    openingHours: hours,
    categories: tags,
} = restaurant;

console.log(restourantName, hours, tags);

const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

let a = 111;
let b = 999;
const obj = {
    a: 23,
    b: 88,
    c: 14,
};

({a, b} = obj);

console.log(a, b);

const {
    fri: {open: o, close: c},
} = openingHours;
console.log(o, c);

const arr = [6, 7, 8];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, `Gnocci`];
console.log(newMenu);

const mainMenuCopy = [...restaurant.mainMenu];

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

const str = `Jonas`;

const letters = [...str, ` `, `S.`];
console.log(letters);
console.log(...str);

const ingredients = [
    // prompt(`Let's make pasta! Ingredient 1?`),
    // prompt(`Ingredient 2?`),
    // prompt(`Ingredient 3?`),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

restaurant.orderPasta(...ingredients);

const newRestaurant = { foundedIn: 2991, ...restaurant, founder: `Jonas` };

console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.Rname = `Restorable Roma`;
console.log(restaurantCopy.Rname);
console.log(restaurant.Rname);


const arr = [1, 2, ...[3, 4]];

const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);

const add = function (...numbers) {
    console.log(numbers);
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
};

add(2, 3);
add(5, 6, 2, 7, 82);
add(5, 6, 23, 3, 3, 3, 3, 3, 7, 82);

const x = [12, 3, 5];

add(...x);

restaurant.orderPizza(`muscrooms`, `Tomato`, `Cheese`);
restaurant.orderPizza(`muscrooms`);


console.log(3 || `jonas`);
console.log('' || 'jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || `Hello` || 12 || null);

// restaurant.numGuests = 23;
const gueast1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(gueast1);

const quests2 = restaurant.numGuests || 10;
console.log(quests2);

console.log(`-------- AND --------`);

console.log(0 && `jonas`);
console.log(7 && `jonas`);
console.log(true && 0);
console.log(undefined && null);

console.log(`Hello` && 23 && null && `Jonas`);

if (restaurant.orderPizza) [restaurant.orderPizza(`Tomato`, `Cheese`)];

restaurant.orderPizza && restaurant.orderPizza(`Tomato`, `Cheese`);

console.log(`-------- ?? --------`);


restaurant.numGuests = 0;
const gueast = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(gueast);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

const rest1 = {
    name: `Restaurant 1`,
    numOfGuests: 0,
};

const rest2 = {
    name: `Restaurant 1`,
    owner: `Sergej`,
};

// rest1.numOfGuests = rest1.numOfGuests || 10;
// rest2.numOfGuests = rest2.numOfGuests || 10;

// rest1.numOfGuests ||= 10
// rest2.numOfGuests ||= 10

rest1.numOfGuests ??= 10;
rest2.numOfGuests ??= 10;

// rest1.owner = rest1.owner && `<ANONYMOUS>`;
// rest2.owner = rest2.owner && `<ANONYMOUS>`;

rest1.owner &&= `<ANONYMOUS>`;
rest2.owner &&=  `<ANONYMOUS>`;

console.log(rest1);
console.log(rest2);

*/
///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },

    printGoals: function (...players) {
        const numberOfGoals = players.length;
        let goalsScored = 0;

        //FOR LOOP
        for (let i = 0; i < players.length; i++) {
            const checkString = players[i];
            if (checkString.length > 1) {
                console.log(`${players[i]} scored a goal.`);
                goalsScored++;
            }
        }

        //FOREACH LOOP
        // players.forEach(player => {
        //     const checkString = player;
        //     if (checkString.length > 1) {
        //         console.log(`${player} scored a goal.`);
        //         goalsScored++;
        //     }
        // });

        //CHECKING IG THERE WERE GOALS
        goalsScored &&
            console.log(`Number of scored goals ${numberOfGoals || 0}`);
    },
};

const [players1, players2] = game.players;

// console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;

// console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];

// console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// console.log(players1Final);

// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const team2 = game.odds.team2;

const {
    odds: {team1, x: draw, team2},
} = game;

// console.log(team1, draw, team2);

// console.log(team1, draw, team2);

// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// game.printGoals(...game.scored);
// game.printGoals('');

// console.log(
//     (team1 < team2 && `${game.team1} is more likely to win.`) ||
//         `${game.team2} is more likely to win.`
// );

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

for (const [i, el] of menu.entries())
{
    console.log(`${i + 1}: ${el}`)
}

// console.log([...menu.entries()])

///////////////////////////////////////
// Optional Chaining

if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
    console.log(day);
    const open = restaurant.openingHours[day]?.open ?? `closed`;
    console.log(`On ${day}, we open at ${open}.`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? `Method does not exist.`);
console.log(restaurant.orderRisotto?.(0, 1) ?? `Method does not exist.`);

// Arrays
const users = [{ name: `Sergej`, age: 30 }];

// const users = []
console.log(users[0]?.name ?? `user array empty`);


const property = Object.keys(openingHours);
console.log(property);

let openStr = `We are open on ${property.length} days: `;

for (const day of Object.keys(openingHours)) {
    openStr += `${day},  `;
}
console.log(openStr);

const values = Object.values(openingHours);

console.log(values);

const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, {open, close}] of entries) {
    console.log(`On ${key} we open at ${open} and close at ${close}.`);
}

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
    Odd of victory Bayern Munich: 1.33
    Odd of draw: 3.25
    Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
    {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
    }

GOOD LUCK 😀

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

for (const [goalNumber, player] of game.scored.entries()) {
    console.log(`Goal ${goalNumber + 1}: ${player}.`);
}

console.log(`------------`);

let averageOdds = 0;

const odds = Object.values(game.odds);

for (const odd of odds) {
    averageOdds += odd;
}

averageOdds /= odds.length;

console.log(
    `Average odd is: ${Math.round(averageOdds * 100) / 100 || `no odds`}.`
);

console.log(`------------`);

for (const [team, odd] of Object.entries(game.odds)) {
    const teamStr = team === `x` ? 'draw' : `victory ${game[team]}`;
    console.log(`Odd of ${teamStr}: ${odd}`);
}

console.log(`------------`);

const scorers = {};

for (const player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}

console.log(scorers)

const ordersSet = new Set([
    `Pasta`,
    `Pizza`,
    `Pizza`,
    `Risotto`,
    `Pasta`,
    `Pizza`,
]);

console.log(ordersSet);

console.log(new Set(`Jonas`));

console.log(ordersSet.size);

console.log(ordersSet.has(`Pizza`));
console.log(ordersSet.has(`Bread`));

ordersSet.add(`Bread`);
ordersSet.add(`Bread`);
ordersSet.delete(`Risotto`);
// ordersSet.clear()
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = [`Waiter`, `Cook`, `Manager`, `Waiter`, `Cook`];

const staffUnique = [...new Set(staff)]
console.log(staff);
console.log(staffUnique);

console.log(new Set([`Waiter`, `Cook`, `Manager`, `Waiter`, `Cook`]).size);

console.log(new Set(`sergejstojanovic`).size)


const rest = new Map();

rest.set(`name`, `Classico Italiano`);
rest.set(1, `Belgrade`);
console.log(rest.set(2, `Brazilia`));

rest.set(`categories`, [`Pizza`, `Pasta`, `Salad`])
    .set(`open`, 11)
    .set(`close`, 23)
    .set(true, `We are open.`)
    .set(false, `We are closed.`);

console.log(rest.get(`name`));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get(`open`) && time < rest.get(`close`)));

console.log(rest.has(`categories`));
rest.delete(2);
// rest.clear()
console.log(rest);
console.log(rest.size);

const arr = [1, 2];
rest.set(arr, `test`);
rest.set(document.querySelector(`h1`), `Heading`);
console.log(rest);

console.log(rest.get(arr));


const question = new Map([
    [`question`, `What is the best programming language in the world`],
    [1, `C`],
    [2, `Java`],
    [3, `JavaScript`],
    [`Correct`, 3],
    [true, `Correct`],
    [false, `Incorrect`],
]);

console.log(question);

console.log(Object.entries(openingHours));

const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);
console.log(question.get(`question`));
for (const [key, value] of question) {
    typeof key === `number` && console.log(`Answer ${key}: ${value}`);
}

const answer = 4;

console.log(question.get(question.get(`Correct`) === answer));

// Map => array

console.log([...question]);
console.log([...question.values()]);
console.log([...question.keys()]);

*/

