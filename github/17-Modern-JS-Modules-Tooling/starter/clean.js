`strict mode`;

const budget = Object.freeze([
    {value: 250, description: 'Sold old TV 📺', user: 'jonas'},
    {value: -45, description: 'Groceries 🥑', user: 'jonas'},
    {value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas'},
    {value: 300, description: 'Freelancing 👩‍💻', user: 'jonas'},
    {value: -1100, description: 'New iPhone 📱', user: 'jonas'},
    {value: -20, description: 'Candy 🍭', user: 'matilda'},
    {value: -125, description: 'Toys 🚂', user: 'matilda'},
    {value: -1800, description: 'New Laptop 💻', user: 'jonas'},
]);

const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});

const getLimit = (user, limits) => limits?.[user] ?? 0;

// Pure function
const addExpens = function (state, limits, value, description, user = `jonas`) {
    const cleanUser = user.toLowerCase();

    return value <= getLimit(cleanUser, limits)
        ? [...state, {value: -value, description, user: cleanUser}]
        : state;
};
const newBudget1 = addExpens(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpens(
    newBudget1,
    spendingLimits,
    100,
    'Going to Movie',
    'Matilda'
);
const newBudget3 = addExpens(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) =>
    state.map(entry =>
        entry.value < -getLimit(entry.user, limits)
            ? {...entry, flag: `limit`}
            : entry
    );

const finalBudget = checkExpenses(newBudget3, spendingLimits);

// Impure (not pure function because it logs something)
const logBigExpenses = function (state, limit) {
    const bigExpenses = state
        .filter(entry => entry.value <= -limit)
        .map(entry => entry.description.slice(-2))
        .join(` / `);
    // .reduce((str, cur) => `${str} / ${cur.description.slice(0, 2)}`, ``);

    console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
