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

const addIncome = function (state, value, description, user) {
    const pureUser = user.toLowerCase();
    const pureDescription = description[0].toUpperCase() + description.slice(1);

    return [...state, {value, description: pureDescription, user: pureUser}];
};

const calcIncome = function (state, user) {
    let income;

    user === ``
        ? (income = state.reduce(
              (total, entry) => (total += entry.value > 0 ? entry.value : 0),
              0
          ))
        : (income = state.reduce(
              (total, entry) =>
                  entry.user === user
                      ? (total += entry.value < 0 ? Math.abs(entry.value) : 0)
                      : total,
              0
          ));

    return income;
};

const Income = function (state, user = ``) {
    user === ``
        ? console.log(`Income is: ${calcIncome(state, user)}$`)
        : console.log(
              `${
                  user[0].toUpperCase() + user.slice(1)
              }'s income is: ${calcIncome(state, user)}$`
          );

    return calcIncome(state, user);
};

const calcExpenses = function (state, user) {
    let expenses;

    user === ``
        ? (expenses = state.reduce(
              (total, entry) =>
                  (total += entry.value < 0 ? Math.abs(entry.value) : 0),
              0
          ))
        : (expenses = state.reduce(
              (total, entry) =>
                  entry.user === user
                      ? (total += entry.value < 0 ? Math.abs(entry.value) : 0)
                      : total,
              0
          ));

    return expenses;
};

const Expenses = function (state, user = ``) {
    user === ``
        ? console.log(`Expenses are: -${calcExpenses(state, user)}$`)
        : console.log(
              `${
                  user[0].toUpperCase() + user.slice(1)
              }'s expenses are: -${calcExpenses(state, user)}$`
          );
    return calcExpenses(state, user);
};

const checkBudget = function (state) {
    console.log(
        `Total budget is: ${state.reduce((total, entry) => {
            return (total += entry.value);
        }, 0)}$`
    );
};

const checkExpenses = (state, limits) =>
    state.map(entry =>
        entry.value < -getLimit(entry.user, limits)
            ? {...entry, flag: `limit`}
            : entry
    );

const expenseOfIncome = function (state, user = ``) {
    const income = calcIncome(state, user);
    const expenses = calcExpenses(state, user);

    console.log(
        `Expenses as percentiles of income: ${Math.round(
            (expenses / income) * 100
        )} %`
    );
};

// Impure (not pure function because it logs something)
const logBigExpenses = function (state, limit) {
    const bigExpenses = state
        .filter(entry => entry.value <= -limit)
        .map(entry => entry.description.slice(-2))
        .join(` / `);
    // .reduce((str, cur) => `${str} / ${cur.description.slice(0, 2)}`, ``);

    console.log(bigExpenses);
};
const newBudget1 = addIncome(budget, 100, `babysitting`, `Matilda`);
const newBudget2 = addExpens(newBudget1, spendingLimits, 10, 'Pizza 🍕');
const newBudget3 = addExpens(newBudget2, spendingLimits, 100, 'Go', 'Matilda');
const newBudget4 = addIncome(newBudget3, 700, `side hustle`, `Jonas`);
const newBudget5 = addExpens(newBudget4, spendingLimits, 200, 'Stuff', 'Jay');

const finalBudget = checkExpenses(newBudget5, spendingLimits);
console.log(finalBudget);
Income(finalBudget);
Income(finalBudget, `matilda`);
Expenses(finalBudget);
Expenses(finalBudget, `jonas`);
checkBudget(finalBudget);
expenseOfIncome(finalBudget);

logBigExpenses(finalBudget, 500);
