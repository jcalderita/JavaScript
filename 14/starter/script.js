'use strict';

/* const Person = function (nombre, anoNacimiento) {
  this.firstName = nombre;
  this.birthYear = anoNacimiento;

  //   Mala practica no crear funciones dentro del constructor
  // this.escribirNombre = function () {
  //   console.log(this.firstName);
  // };
};

Person.hey = function () {
  console.log('Hey there');
}; */

// Prototipos, así solo existe una copia de la función
/* Person.prototype.escribirNombre = function () {
  console.log(this.firstName);
}; */
//También se pueden establecer propiedades
/* Person.prototype.especie = 'Humano';

const jorge = new Person('Jorge', 1979); */
/* console.log(jorge.especie);
jorge.escribirNombre();
console.log(jorge.hasOwnProperty('firstName'));
console.log(jorge.hasOwnProperty('especie'));*/

// Coding Challenge 01

/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
}; */
// const pintarVelocidad = (make, speed) => console.log(`'${make}' going at ${speed} km/h`);
/* Car.prototype.pintarVelocidad = function () {
  console.log(`'${this.make}' going at ${this.speed} km/h`);
}; */
/* Car.prototype.accelerate = function () {
  this.speed += 10;
  this.pintarVelocidad();
  // pintarVelocidad(this.make, this.speed);
  // console.log(`'${this.make}' going at ${this.speed} km/h`);
}; */
/* Car.prototype.brake = function () {
  this.speed -= 5;
  this.pintarVelocidad();
  // pintarVelocidad(this.make, this.speed);
  // console.log(`'${this.make}' going at ${this.speed} km/h`);
}; */

// const bmw = new Car('BMW', 120);
/* bmw.accelerate();
bmw.brake();
bmw.brake(); */
// const mercedes = new Car('Mercedes', 95);
/* mercedes.brake();
mercedes.brake();
mercedes.accelerate(); */

// Class ES6
// expresion
// const PersonCL = class {};

// declaration
/* class PersonCL {
  constructor(nombreCompleto, anoNacimiento) {
    this.firstName = nombreCompleto;
    this.birthYear = anoNacimiento;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set firstName(name) {
    if (name.includes(' ')) this._firstName = name;
    else alert(`${name} is not a full name!`);
  }

  get firstName() {
    return this._firstName;
  }

  static hey() {
    console.log('Hey there');
  }
} */
/* 
const jorge = new PersonCL('Jorge Calderita', 1979);
console.log(jorge);
console.log(jorge.firstName);

PersonCL.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jorge.greet();
PersonCL.hey();

// Getter and Setters
const account = {
  owner: 'Jorge',
  movements: [200, 300, 120, 533],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest = 150;
console.log(account.latest);

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(name, anoNacimiento) {
    (this.firstName = name), (this.birthYear = anoNacimiento);
  },
};
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 1979;
console.log(steven);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1990);
console.log(sarah); */

// Coding Challenge 02
/* class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  pintarVelocidad() {
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }
  accelerate() {
    this.speed += 10;
    this.pintarVelocidad();
  }
  brake() {
    this.speed -= 5;
    this.pintarVelocidad();
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(millas) {
    this.speed = millas * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
ford.accelerate();
ford.brake();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 80;
console.log(ford.speed); */

// Herencia entre clases

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

Student.prototype.constructor = Student;

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); */

// Coding Challenge 03
/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
// const pintarVelocidad = (make, speed) => console.log(`'${make}' going at ${speed} km/h`);
Car.prototype.pintarVelocidad = function () {
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  this.pintarVelocidad();
  // pintarVelocidad(this.make, this.speed);
  // console.log(`'${this.make}' going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  this.pintarVelocidad();
  // pintarVelocidad(this.make, this.speed);
  // console.log(`'${this.make}' going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge + '%';
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo + '%';
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge = parseInt(this.charge) - 1 + '%';
  console.log(`'${this.make}' going at ${this.speed} km/h with a charge of ${this.charge}`);
};

EV.prototype.constructor = EV;

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake(); */

// Clase heredadas ES6
/* class PersonCL {
  constructor(nombreCompleto, anoNacimiento) {
    this.firstName = nombreCompleto;
    this.birthYear = anoNacimiento;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set firstName(name) {
    if (name.includes(' ')) this._firstName = name;
    else alert(`${name} is not a full name!`);
  }

  get firstName() {
    return this._firstName;
  }

  static hey() {
    console.log('Hey there');
  }
}

class StudentCL extends PersonCL {
  constructor(nombreCompleto, anoNacimiento, course) {
    super(nombreCompleto, anoNacimiento);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.firstName} and study ${this.course}`);
  }
  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`);
  }
}

const jorge = new StudentCL('Jorge Calderita', 2020, 'Política');
console.log(jorge);
jorge.introduce();
jorge.calcAge(); */

// Herencia con Object.create
/* const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(name, anoNacimiento) {
    this.firstName = name;
    this.birthYear = anoNacimiento;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (name, anoNacimiento, course) {
  PersonProto.init.call(this, name, anoNacimiento);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2020, 'Política');
console.log(jay);
jay.introduce(); */

// Another class example
/* class Account {
  // Public field
  locale = navigator.language;
  // Private field
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
  }
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved ${this.owner}`);
    }
    return this;
  }
  // Metodos privados
  #approveLoan(val) {
    return true;
  }
  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
/*console.log(acc1);
console.log(acc1.getMovements());
// console.log(acc1.#approveLoan(100));
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1); */

// Coding Challenge 03
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  pintarVelocidad() {
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }
  accelerate() {
    this.speed += 10;
    this.pintarVelocidad();
  }
  brake() {
    this.speed -= 5;
    this.pintarVelocidad();
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge + '%';
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo + '%';
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge = parseInt(this.#charge) - 1 + '%';
    console.log(`'${this.make}' going at ${this.speed} km/h with a charge of ${this.#charge}`);
    return this;
  }
}

const tesla = new EVCl('Tesla', 120, 23);
tesla.chargeBattery(90).accelerate().brake();
tesla.accelerate();
tesla.brake();
