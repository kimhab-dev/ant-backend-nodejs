const _ = require('lodash');

let num = 0;
let intervalID = setInterval(() => {
    num = _.random(1, 30);
    console.log("Number Random : ", num);
    if (num === 10) {
        clearInterval(intervalID);
    }
}, 3000)