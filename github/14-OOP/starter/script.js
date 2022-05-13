'use strict';

// const Person = function (firstName, birthYear) {
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;

//     // Never to this
//     // this.calcAge = function () {
//     //     console.log(2037 - this.birthYear);
//     // };
// };

// const sergej = new Person(`Sergej`, 2003);

// console.log(sergej);

// // 1. new {} is created
// // 2. function is called, this = {}
// // 3. {} linked to prototype
// // 4. function aromatically return {}

// const matilda = new Person(`Matilda`, 2000);
// const jack = new Person(`Jack`, 1972);

// console.log(matilda, jack);

// console.log(sergej instanceof Person);

// Person.hey = function ()
// {
// console.log(`Hey there!`);
// console.log(this);
// }

// Person.hey()

// // Prototypes

// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//     console.log(2037 - this.birthYear);
// };

// sergej.calcAge();
// matilda.calcAge();
// jack.calcAge();

// console.log(sergej.__proto__);
// console.log(sergej.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(sergej));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// Person.prototype.species = `Human`;
// console.log(sergej.species, matilda.species, jack);

// console.log(sergej.hasOwnProperty(`firstName`));
// console.log(sergej.hasOwnProperty(`species`));

// console.log(sergej.__proto__);
// console.log(sergej.__proto__.__proto__);
// console.log(sergej.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

// const arr = [3, 4, 10, 6, 66, 6, 6, 6, 6, 666, 6, 6, 7, 8, 9, 2];

// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//     return [...new Set(this)];
// };

// console.log(arr);
// console.log(arr.unique());

// const h1 = document.querySelector(`h1`);
// console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀

*/

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = `${speed}km/h`;
// };

// const E6 = new Car(`BMW`, 90);
// const M2 = new Car(`Mercedes`, 120);

// Car.prototype.accelerate = function () {
//     this.speed = parseFloat(this.speed) + 10 + `km/h`;

//     console.log(this.speed);
// };

// Car.prototype.break = function () {
//     this.speed = parseFloat(this.speed) - 5 + `km/h`;

//     console.log(this.speed);
// };

// E6.accelerate();
// E6.break();

// M2.break();
// M2.break();
// M2.break();
// M2.accelerate();
// M2.accelerate();
// M2.break();
// M2.accelerate();

///////////////////////////////////////

//class declaration
// class PersonCL
// {

// }

//class expression

// const PersonCl = class {
//     constructor(fullName, birthYear) {
//         //DATA
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     // BEHAVIOR

//     // Instance methods
//     // Methods will be added to .prototype property
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     }

//     greet() {
//         console.log(`Hey ${this.fullName}.`);
//     }

//     get age() {
//         return 2037 - this.birthYear;
//     }

//     set fullName(name) {
//         if (name.includes(` `)) {
//             this._fullName = name;
//         } else {
//             alert(`${name} is not full name!`);
//         }
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     set sex(sex) {
//         this._sex = sex;
//     }

//     get sex() {
//         return this._sex;
//     }

//     // Static methods
//     static hey() {
//         console.log(`Hey there!`);
//         console.log(this);
//     }
// };

// const jessica = new PersonCl(`Jessica Davis`, 1999);
// console.log(jessica);
// // jessica.calcAge();
// // console.log(jessica.age);
// jessica.sex = `female`;

// console.log(jessica);

// PersonCl.hey()

// console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//     console.log(`Hey ${this.firstName}.`);
// };

// jessica.greet();

// // 1. Classes are NOT hoisted
// // 2, Class are first-class citizens
// // 3. Classes are executed in strict mode

// const account = {
//     owner: `Sergej`,
//     movements: [200, 300, 132, 244],

//     get latest() {
//         return this.movements.slice(-1).pop();
//     },

//     set latest(mov) {
//         this.movements.push(mov);
//     },
// };

// console.log(account.latest);
// account.latest = 50;
// console.log(account.movements);

// const walter = new PersonCl(`Walter Yesman`, 1965);

///////////////////////////////////////

// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear);
//     },

//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// };

// const steven = Object.create(PersonProto);
// console.log(steven);
// steven.name = `Steven`;
// steven.birthYear = 2002;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

// const sarah = Object.create(PersonProto);
// sarah.init(`Sarah`, 1979);
// sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = `${speed}km/h`;
// };

// const E6 = new Car(`BMW`, 90);
// const M2 = new Car(`Mercedes`, 120);

// const CarCL = class {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }

//     get speedUS() {
//         return this.speed / 1.6;
//     }

//     set speedUS(speedMPH) {
//         this.speed = speedMPH * 1.6;
//     }

//     get accelerate() {
//         this.speed = parseFloat(this.speed) + 10 + `km/h`;

//         console.log(this.speed);
//     }

//     get break() {
//         this.speed = parseFloat(this.speed) - 5 + `km/h`;

//         console.log(this.speed);
//     }
// };

// const E6 = new CarCL(`BMW`, 90);
// const M2 = new CarCL(`Mercedes`, 120);

// console.log(E6);
// E6.speedUS = 50;
// E6.accelerate;
// E6.break;
// E6.accelerate;
// E6.break;
// console.log(E6);

// console.log(M2);
// M2.speedUS = 100;
// M2.accelerate
// M2.accelerate
// M2.accelerate
// M2.break
// console.log(M2);

// const Person = function (firstName, birthYear) {
//     // Instance properties
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//     console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//     Person.call(this, firstName, birthYear)
//     this.course = course;
// };

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype)

// // Student.prototype = Person.prototype

// Student.prototype.introduce = function () {
//     console.log(`My name is ${this.firstName} and I study ${this.course}.`);
// };

// const mike = new Student(`Mike`, 2020, `Computer Science`);
// console.log(mike);
// mike.introduce();
// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);

// Student.prototype.constructor = Student
// console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//     this.speed = this.speed + 10;

//     console.log(this.speed);
// };

// Car.prototype.break = function () {
//     this.speed = this.speed - 5;

//     console.log(this.speed);
// };

// const EV = function (make, speed, charge) {
//     Car.call(this, make, speed);
//     this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//     this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//     this.speed += 20;
//     this.charge--;

//     console.log(
//         `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%.`
//     );
// };

// const tesla = new EV(`Tesla`, 120, 23);

// console.log(tesla);
// tesla.accelerate();
// tesla.chargeBattery(59);
// console.log(tesla);
// tesla.break();
// tesla.break();
// tesla.chargeBattery(99);
// console.log(tesla);
// tesla.break();
// tesla.accelerate();

// console.log(tesla);
