let i = 10;
let name = 'ANT';

console.log(i);
console.log(name);

let count = 0;
let intervalID = setInterval(() => {
    console.log('Set interval');

    count++;

    if (count === 5) {
        clearInterval(intervalID);
    };
}, 2000)