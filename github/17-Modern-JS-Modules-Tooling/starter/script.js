// // Importing module
// // import {addToCart, totalPrice as price, tq} from './shoppingCart.js';
// // addToCart(`bread`, 5);
// // console.log(price, tq);

// console.log(`Importing module`);
// // // // console.log(shippingCost)

// // // import * as ShoppingCart from './shoppingCart.js';

// // // ShoppingCart.addToCart(`bread`, 5);
// // // console.log(ShoppingCart.totalPrice)

// import add, {
//     cart /*, {addToCart, totalPrice as price, tq}*/,
// } from './shoppingCart.js';

// add(`pizza`, 2);
// add(`apple`, 3);
// add(`bread`, 5);
// // console.log(price)

// console.log(cart);

// // console.log(`Start fetching`);

// // const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
// // const data = await res.json();
// // console.log(data);

// // console.log(`Something`);

// // const getLastPost = async function () {
// //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// //     const data = await res.json();

// //     return {title: data.at(-1).title, text: data.at(-1).body};
// // };
// // const lastPost = getLastPost();

// // console.log(lastPost);

// // // Not very clean
// // lastPost.then(last => console.log(last));

// // const lastPost2 = await getLastPost();
// // console.log(lastPost2)

// // const ShoppingCart2 = (function () {
// //     const cart = [];
// //     const shippingCost = 10;
// //     const totalPrice = 237;
// //     const totalQuantity = 23;

// //     const addToCart = function (product, quantity) {
// //         cart.push({product, quantity});
// //         console.log(
// //             `${quantity} ${product} added to cart (shipping cost is: ${shippingCost})`
// //         );
// //     };

// //     const orderStock = function (product, quantity) {
// //         cart.push({product, quantity});
// //         console.log(`${quantity} ${product} added to cart`);
// //     };

// //     return {
// //         addToCart,
// //         cart,
// //         totalPrice,
// //         totalQuantity,
// //     };
// // })();

// // ShoppingCart2.addToCart(`apple`, 2);
// // ShoppingCart2.addToCart(`pizza`, 4);
// // console.log(ShoppingCart2);
// // console.log(ShoppingCart2.shippingCost);

// /////// COMMON JS
// // used because of npm and node.js

// // // Export
// // export.addToCart = function (product, quantity)
// // {
// //     cart.push({ product, quantity });
// //     console.log(
// //         `${quantity} ${product} added to cart (shipping cost is: ${shippingCost})`
// //     );
// // };

// // // Improt
// // const { addToCart } = require(`./shoppingCart.js`);

// // import cloneDeep from '../../../node_modules/lodash-es/cloneDeep.js';
// import {cloneDeep} from 'lodash-es';

// const state = {
//     cart: [
//         {product: 'bread', quantity: 5},
//         {product: 'pizza', quantity: 3},
//     ],
//     user: {
//         loggedIn: false,
//     },
// };

// const stateShallowClone = Object.assign({}, state);

// const stateDeepClone = cloneDeep(state);

// state.user.loggedIn = true;

// console.log(stateShallowClone);
// console.log(state);
// console.log(stateDeepClone);

// if (module.hot) {
//     module.hot.accept();
// }

// class Person {
//     #greeting = 'Hey';
//     constructor(name) {
//         this.name = name;
//         console.log(`${this.#greeting}, ${this.name}.`);
//         this.#printHello();
//     }

//     #printHello() {
//         console.log(`Hello ${this.name}`);
//     }
// }

// const sergej = new Person(`Sergej`);

// console.log(`Sergej` ?? null);

// console.log(cart.find(el => el.quantity >= 2));

// Promise.resolve(`Test`).then(res => console.log(res));

// import 'core-js/stable';

// // import 'core-js/stable/array/find'
// // import 'core-js/stable/promise';

// import 'regenerator-runtime/runtime'
