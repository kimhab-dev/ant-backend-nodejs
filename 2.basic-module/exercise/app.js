const sum = require('./sum.js');
const minus = require('./minus.js');
const mul = require('./mul.js');

const calculat = require('./calculat.js')

console.log("Sum", sum(10, 20));
console.log("Minus", minus(20, 10));
console.log("Multiple", mul(20, 10));

console.log("All calculate",
    calculat.sum(10, 20),
    calculat.minus(10, 20),
    calculat.mul(10, 20),
)