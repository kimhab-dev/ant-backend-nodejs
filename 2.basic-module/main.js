const os = require("os");
const fs = require("fs");

// const mouykea = require('./people.js')
// const { age, people } = require('./people.js');

console.log("os hostname", os.hostname());
console.log("os homedir", os.homedir());
console.log("os machine", os.machine());
console.log("os userInfo", os.userInfo());

fs.writeFileSync('test.txt', 'Hello Node!');
const data = fs.readFileSync('test.txt', 'utf8');
console.log(data);

// console.log("log from main people", people);
// console.log("log from main age", age);

// mouykea.greeting();