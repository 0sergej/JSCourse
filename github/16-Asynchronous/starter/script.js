'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = ``) {
    console.log(data);
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

const renderError = function (msg) {
    countriesContainer.insertAdjacentText(`beforeend`, msg);
};

// const getCountryAndNeighbored = function (country) {
//     //AJAX call country 1
//     const request1 = new XMLHttpRequest();
//     request1.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
//     request1.send();

//     request1.addEventListener(`load`, function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         // Render country 1
//         renderCountry(data);

//         // Get neighbor country (2)
//         const [neighbor] = data.borders;

//         // Guard clause
//         if (!neighbor) return;
//         //AJAX call country 1
//         const request2 = new XMLHttpRequest();
//         request2.open(
//             `GET`,
//             `https://restcountries.com/v3.1/alpha/${neighbor}`
//         );
//         request2.send();

//         request2.addEventListener(`load`, function () {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, `neighbor`);
//         });
//     });
// };

// getCountryAndNeighbored(`usa`);
// // getCountryData(`usa`);
// // getCountryData(`germany`);

// setTimeout(() => {
//     console.log(`1 second passed`);
//     setTimeout(() => {
//         console.log(`2 seconds passed`);
//         setTimeout(() => {
//             console.log(`3 seconds passed`);

//             setTimeout(() => {
//                 console.log(`4 seconds passed`);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);

//     const request1 = new XMLHttpRequest();
//     request1.open(`GET`, `https://restcountries.com/v3.1/name/${country}`);
//     request1.send();

// const request = fetch(`https://restcountries.com/v3.1/name/serbia`);
// console.log(request);

// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         .then(function ([data]) {
//             console.log(data);
//             renderCountry(data);
//         });
// };

const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then((data) => {
            renderCountry(data[0]);
            const neighbor = data.borders[0];

            if (!neighbor) return;

            // Country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
        })
        .then(response => response.json())
        .then((data) => renderCountry(data[0], `neighbour`))
        .catch(err => {
            console.error(`${err} error`);
            renderError(`Something went wrong, ${err.message}.`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

btn.addEventListener(`click`, function () {
    getCountryData(`usa`);
});

getCountryData(`fdwaw`)
