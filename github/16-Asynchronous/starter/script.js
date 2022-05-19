'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = ``) {
    const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);
};

// const renderError = function (msg) {
//     countriesContainer.insertAdjacentText(`beforeend`, msg);
// };

// // const getCountryAndNeighbored = function (country) {
// //     //AJAX call country 1
// //     const request1 = new XMLHttpRequest();
// //     request1.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
// //     request1.send();

// //     request1.addEventListener(`load`, function () {
// //         const [data] = JSON.parse(this.responseText);
// //         console.log(data);

// //         // Render country 1
// //         renderCountry(data);

// //         // Get neighbor country (2)
// //         const [neighbor] = data.borders;

// //         // Guard clause
// //         if (!neighbor) return;
// //         //AJAX call country 1
// //         const request2 = new XMLHttpRequest();
// //         request2.open(
// //             `GET`,
// //             `https://restcountries.com/v3.1/alpha/${neighbor}`
// //         );
// //         request2.send();

// //         request2.addEventListener(`load`, function () {
// //             const [data2] = JSON.parse(this.responseText);
// //             console.log(data2);

// //             renderCountry(data2, `neighbor`);
// //         });
// //     });
// // };

// // getCountryAndNeighbored(`usa`);
// // // getCountryData(`usa`);
// // // getCountryData(`germany`);

// // setTimeout(() => {
// //     console.log(`1 second passed`);
// //     setTimeout(() => {
// //         console.log(`2 seconds passed`);
// //         setTimeout(() => {
// //             console.log(`3 seconds passed`);

// //             setTimeout(() => {
// //                 console.log(`4 seconds passed`);
// //             }, 1000);
// //         }, 1000);
// //     }, 1000);
// // }, 1000);

// //     const request1 = new XMLHttpRequest();
// //     request1.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
// //     request1.send();

// // const request = fetch(`https://restcountries.com/v3.1/name/serbia`);
// // console.log(request);

// // const getCountryData = function (country) {
// //     fetch(`https://restcountries.com/v3.1/name/${country}`)
// //         .then(function (response) {
// //             console.log(response);
// //             return response.json();
// //         })
// //         .then(function ([data]) {
// //             console.log(data);
// //             renderCountry(data);
// //         });
// // };

// const getJSON = function (url, errorMsg = `Something went wrong`) {
//     return fetch(url).then(response => {
//         if (!response.ok) {
//             throw new Error(`${errorMsg} (${response.status})`);
//         }

//         return response.json();
//     });
// };

// const getCountryData = function (country) {
//     // Country 1
//     getJSON(
//         `https://restcountries.com/v3.1/name/${country}`,
//         `Country not found`
//     )
//         .then(data => {
//             renderCountry(data[0]);
//             let neighbor;
//             try {
//                 neighbor = data[0].borders[0];
//             } catch (error) {
//                 throw new Error(`No neighbor found!`);
//             }

//             // Country 2
//             return getJSON(
//                 `https://restcountries.com/v3.1/alpha/${neighbor}`,
//                 `Country not found`
//             );
//         })
//         .then(data => {
//             renderCountry(data[0], `neighbour`);
//         })
//         .catch(err => {
//             console.error(`${err} error`);
//             renderError(`Something went wrong, ${err.message}.`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// };

// btn.addEventListener(`click`, function () {
//     getCountryData(`usa`);
// });

// getCountryData(`australia`);

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//     return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
//     )
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`No country with such coordinates.`);
//             // if (response.status === 200) {
//             //     throw new Error(`You are reload 2 fast.`)
//             // }

//             return response.json();
//         })
//         .then(data => {
//             if (!data.countryName)
//                 throw new Error(`No country with such coordinates.`);

//             console.log(`You are in ${data.city}, ${data.countryName}.`);

//             loadCountry(data.countryCode);
//         })
//         .catch(err => console.log(`Error occurred: "${err.message}".`));
// };

// const loadCountry = function (countryCode) {
//     fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
//         .then(response => {
//             if (!response.ok)
//                 throw new Error(`No country with such coordinates.`);

//             return response.json();
//         })
//         .then(data => {
//             renderCountry(data[0]);
//         })
//         .catch(err => console.log(`Error occurred: "${err.message}".`))
//         .finally(_ => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener(`click`, function () {
//     whereAmI(-33.933, 18.474);
// });

// console.log(`Test start`);
// setTimeout(() => {
//     console.log(`0 sec timer`);
// }, 0);
// Promise.resolve(`Resolved promise 1`).then(res => console.log(res));
// Promise.resolve(`Resolved promise 2`).then(res => {
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res);
// });

// console.log(`Test end`);
