const fs = require('fs');

if (!(fs.existsSync('exercise/test.txt'))) {
    fs.writeFile("exercise/test.txt", "Mouykea sava", (err) => {
        if (err) console.log(err);
        console.log("create success");
    });
    return;
}
let count = 0;
let intervalID = setInterval(() => {
    fs.readFile('exercise/test.txt', 'utf8', (error, data) => {
        if (error) console.log(error);
        fs.writeFile("exercise/test.txt", `hab smos nas \n${data}`, (err) => {
            if (err) console.log(err);
        });
    });
    count++;
    if (count === 100) {
        clearInterval(intervalID);
    };
}, 200)


// fs.appendFile("exercise/test.txt", "\nhab smos nas", (err) => {
//     if (err) console.log(err);
//     console.log("create success");
// });

// fs.linkSync("exercise/test.txt", "mouykea sava klang nas", (err) => {
//     if (err) console.log(err);
//     console.log("create success");
// });

// setTimeout(() => {
//     fs.link("exercise/test.txt", "mouykea sava klang nas", (err) => {
//         if (err) console.log(err);
//         console.log("create success");
//     });
// }, 1000);