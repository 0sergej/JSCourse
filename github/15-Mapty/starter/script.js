'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Workout = class {
    date = new Date();
    id = (Date.now() + ``).slice(-10);
    clicks = 1;

    coords;
    distance;
    duration;

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    click() {
        this.clicks++;
    }
};

const Running = class extends Workout {
    type = `running`;

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);

        this.cadence = cadence;

        this._setDescription();
        this.#calcPace();
    }

    #calcPace() {
        // km/min
        this.pace = this.duration / this.distance;
        return this.pace;
    }
};

const Cycling = class extends Workout {
    type = `cycling`;

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);

        this.elevationGain = elevationGain;

        this._setDescription();
        this.#calcPace();
    }

    #calcPace() {
        // km/hr
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
};

//  Test data
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

// APPLICATION ARCHITECTURE
const form = document.querySelector('.form');

const containerWorkouts = document.querySelector('.workouts');

const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const inputSortBy = document.querySelector('.form__sort--by');
const inputSortType = document.querySelector('.form__sort--type');

const App = class {
    #map;
    #mapEvent;
    #markers = [];
    #popups = [];
    #workouts = [];
    #editingWorkout;
    #mapZoomLevel = 12;

    constructor() {
        // Get user's position
        this.#getPosition();

        //Get data from local storage
        this.#getLocaleStorage();

        // Handlers
        form.addEventListener(`submit`, this.#newWorkout.bind(this));
        form.addEventListener(`submit`, this.#showEditedWorkout.bind(this));
        inputType.addEventListener(`change`, this.#toggleElavationField);
        containerWorkouts.addEventListener(
            `click`,
            this.#moveToPopup.bind(this)
        );
        containerWorkouts.addEventListener(
            `click`,
            this.#deleteWorkout.bind(this)
        );
        containerWorkouts.addEventListener(
            `click`,
            this.#deleteAllWorkouts.bind(this)
        );
        containerWorkouts.addEventListener(
            `click`,
            this.#editWorkout.bind(this)
        );
        containerWorkouts.addEventListener(
            `click`,
            this.#sortWorkouts.bind(this)
        );
    }

    #getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this.#loadMap.bind(this),
                function () {
                    alert(`Could not get Your position`);
                }
            );
        }
    }

    #loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;

        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on(`click`, this.#showForm.bind(this));

        this.#workouts.forEach(work => {
            this.#renderWorkoutMarker(work);
        });
    }

    #showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove(`hidden`);
        inputDistance.focus();
    }

    #hideForm() {
        // Empty inputs
        inputDistance.value =
            inputCadence.value =
            inputElevation.value =
            inputDuration.value =
                ``;

        // Hide Form
        form.style.display = `none`;
        form.classList.add(`hidden`);
        setTimeout(() => (form.style.display = `grid`), 1000);
    }

    #toggleElavationField() {
        inputElevation
            .closest(`.form__row`)
            .classList.toggle(`form__row--hidden`);
        inputCadence
            .closest(`.form__row`)
            .classList.toggle(`form__row--hidden`);
    }

    #newWorkout(e) {
        // Guard clause
        if (this.#editingWorkout !== undefined) return;

        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);
        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // If workout running, create running object
        if (type === `running`) {
            const cadence = +inputCadence.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert(`Inputs have to be positive numbers!`);

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout cycling, create cycling object
        if (type === `cycling`) {
            const elevation = +inputElevation.value;

            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert(`Inputs have to be positive numbers!`);

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        //Render workout on map as maker
        this.#renderWorkoutMarker(workout);

        // Close popup on all other markers
        this.#popups.slice(0, -1).forEach(popup => this.#map.closePopup(popup));

        // Render workout on sidebar
        this.#renderWorkout(workout);

        // Hide form + Clear input fields
        this.#hideForm();

        // Set local storage to all workouts
        this.#setLocaleStorage();
    }

    #renderWorkoutMarker(workout) {
        const popup = L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
        });

        this.#popups.push(popup);

        this.#markers.push(
            L.marker(workout.coords, {id: workout.id + ``})
                .addTo(this.#map)
                .bindPopup(popup)
                .setPopupContent(
                    `${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`} ${
                        workout.description
                    }`
                )
                .openPopup()
        );
    }

    #renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <i class="workout__edit">&#9998;</i>
            <i class="workout__delete">&#10060;</i>
            <div class="workout__details">
                <span class="workout__icon">${
                    workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`
                }</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if (workout.type === `running`) {
            html += `
            
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
        </li>`;
        }

        if (workout.type === `cycling`) {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
        </li>
        `;
        }

        form.insertAdjacentHTML(`afterend`, html);

        const showMe = `workout__buttons`;
        this.#show(showMe);
    }

    #moveToPopup(e) {
        const workoutEl = e.target.closest(`.workout`);

        if (e.target.classList.contains(`workout__delete`)) return;
        if (!workoutEl) return;

        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {duration: 1},
        });

        // using the public interface
        // workout.click();
    }

    #deleteWorkout(e) {
        // Gets target element
        const deleteEl = e.target.closest(`.workout`);

        // Checks if element is `X`
        if (!e.target.classList.contains(`workout__delete`)) return;

        // Remove workout from #workouts arr with the same id as selected element
        this.#workouts.find(
            (workout, i) =>
                workout.id === deleteEl.dataset.id &&
                this.#workouts.splice(i, 1)
        );

        // Update database
        localStorage.setItem(`workouts`, JSON.stringify(this.#workouts));

        // Delete a pin that cornpones with selected workout
        this.#deletePin(deleteEl);

        // Hide buttons and sort form if there are no more workouts
        if (this.#workouts.length === 0) {
            const hideMe = `workout__buttons`,
                hideForm = `form__sort`;
            this.#hide(hideMe);
            this.#hide(hideForm);
        }

        // Self destruct element
        deleteEl.remove();
    }

    #deleteAllWorkouts(e) {
        // Guard clause
        if (!e.target.classList.contains(`workout__delete--all`)) return;

        // Gets all existing workouts
        const [...allWorkouts] = e.target.closest(`.workouts`).children;

        const workouts = allWorkouts
            .map(workout => {
                if (workout.classList.contains(`workout`)) {
                    return workout;
                }
            })
            .filter(isUndefined => isUndefined !== undefined);

        // Delete all pins
        this.#deletePin(workouts);

        // Deletes all workouts
        const parrentEl = e.target.closest(`.workouts`);

        const [...elements] = parrentEl.children;

        elements.forEach(element => {
            element.classList.contains(`workout`) && element.remove();
        });

        this.#workouts = [];

        // Hide DeleteAll and form sort
        const hideMe = `workout__buttons`,
            hideForm = `form__sort`;
        this.#hide(hideMe);
        this.#hide(hideForm);

        // Delete workouts from database
        localStorage.clear();
    }

    #deletePin(...elements) {
        // Flattens argument if it was an array
        elements = elements.flat();

        // Removes markers with same id as elements
        elements.forEach(element => {
            this.#markers.find(marker => {
                marker.options.id === element.dataset.id &&
                    this.#map.removeLayer(marker);
            });
        });
    }

    #editWorkout(e) {
        const element = e.target;

        // Guard clause
        if (!element.classList.contains(`workout__edit`)) return;

        // Find a workout
        const workoutEl = element.closest(`.workout`);
        this.#editingWorkout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );

        // Open form
        this.#showForm();
    }

    #showEditedWorkout(e) {
        // Check if element should be edited
        if (this.#editingWorkout === undefined) return;

        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        // Prevents default behavior
        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        // Sets new workout type
        this.#editingWorkout.type = type;

        // Update object
        if (type === `running`) {
            const cadence = +inputCadence.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert(`Inputs have to be positive numbers!`);

            this.#editingWorkout.distance = distance;
            this.#editingWorkout.duration = duration;
            this.#editingWorkout.cadence = cadence;
        }

        // Update object
        if (type === `cycling`) {
            const elevation = +inputElevation.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert(`Inputs have to be positive numbers!`);

            this.#editingWorkout.distance = distance;
            this.#editingWorkout.duration = duration;
            this.#editingWorkout.elevation = elevation;
        }

        // Delete old workout
        const workout = this.#workouts.find(
            work => work.id === this.#editingWorkout.id
        );
        const [...oldWorkout] = document.querySelectorAll(`.workout`);
        oldWorkout.find(work => work.dataset.id === workout.id).remove();

        // Delete old workout
        this.#workouts.splice(
            this.#workouts.indexOf(oldWorkout, 1, this.#editingWorkout)
        );

        // Render edited workout
        this.#renderWorkout(this.#editingWorkout);

        // Put edited workout in array
        this.#workouts.push(this.#editingWorkout);

        // Update database
        this.#setLocaleStorage();

        // Hide form + Clear input fields
        this.#hideForm();

        // Delete #editingWorkout
        this.#editingWorkout = undefined;
    }

    #sortWorkouts(e) {
        // Guard clause
        if (!e.target.classList.contains(`workouts__sort`)) return;

        // Show Form
        const showMe = `form__sort`;
        this.#show(showMe);

        // Get data from input form
        const sortBy = inputSortBy.value;
        const sortType = inputSortType.value;

        // Put cycling first
        if (sortBy === `elevationGain`) {
            const asc = `asc`;
            this.#sortByType(asc);
        }
        // Put running first
        if (sortBy === `cadence`) {
            const desc = `desc`;
            this.#sortByType(desc);
        }

        // Put cycling first
        if (sortBy === `speed`) {
            const asc = `asc`;
            this.#sortByType(asc);
        }
        // Put running first
        if (sortBy === `pace`) {
            const desc = `desc`;
            this.#sortByType(desc);
        }

        // If sorting is done by TYPE:
        if (sortBy === `type`) {
            this.#sortByType(sortType);
        } else {
            // Sort workouts
            if (sortType === `asc`) {
                this.#workouts.sort((workoutA, workoutB) => {
                    return workoutA[sortBy] - workoutB[sortBy];
                });
            }

            if (sortType === `desc`) {
                this.#workouts.sort((workoutA, workoutB) => {
                    return workoutB[sortBy] - workoutA[sortBy];
                });
            }
        }

        // Rerender all workouts
        const parrentEl = e.target.closest(`.workouts`);
        const [...elements] = parrentEl.children;
        elements.forEach(element => {
            element.classList.contains(`workout`) && element.remove();
        });

        this.#setLocaleStorage();

        this.#workouts.forEach(work => {
            this.#renderWorkout(work);
        });
    }

    #sortByType(sortType) {
        // Cycling first
        if (sortType === `asc`) {
            // sort by fist char in type
            this.#workouts.sort((workoutA, workoutB) => {
                const typeA = workoutA.type.charCodeAt(1);
                const typeB = workoutB.type.charCodeAt(1);

                return typeA - typeB;
            });
        }

        // Running  first
        if (sortType === `desc`) {
            // sort by fist char in type (c is "smaller" than r)
            this.#workouts.sort((workoutA, workoutB) => {
                const typeA = workoutA.type.charCodeAt(1);
                const typeB = workoutB.type.charCodeAt(1);

                return typeB - typeA;
            });
        }
    }

    #setLocaleStorage() {
        localStorage.setItem(`workouts`, JSON.stringify(this.#workouts));
    }

    #getLocaleStorage() {
        const data = JSON.parse(localStorage.getItem(`workouts`));

        // Checks if there is any data
        if (!data) return;

        // Checks if data is an empty string (because of deletee)
        if (Object.keys(data).length === 0) localStorage.clear();

        // Create Running and Cycling objects out of stored data
        data.forEach(w => {
            let workout;

            if (w.type === `running`) {
                workout = new Running(
                    w.coords,
                    w.distance,
                    w.duration,
                    w.cadence
                );
            }

            if (w.type === `cycling`) {
                workout = new Cycling(
                    w.coords,
                    w.distance,
                    w.duration,
                    w.elevationGain
                );
            }

            this.#workouts.push(workout);
        });

        this.#workouts.forEach(work => {
            this.#renderWorkout(work);
        });
    }

    reset() {
        localStorage.removeItem(`workouts`);
        location.reload();
    }

    #show(element) {
        // Select all elements
        const [...elements] = containerWorkouts.children;

        // Show element
        elements.forEach(
            el =>
                el.classList.contains(element) && el.classList.remove(`hidden`)
        );
    }

    #hide(element) {
        // Select all elements
        const [...elements] = containerWorkouts.children;

        // Hide element
        elements.forEach(
            el => el.classList.contains(element) && el.classList.add(`hidden`)
        );
    }
};

const app = new App();
