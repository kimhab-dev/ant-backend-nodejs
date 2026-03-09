const express = require('express');
const morgan = require('morgan');

const app = express();

let count = 0;
app.use((req, res, next) => {
    count++;
    if (count <= 3) {
        next();
    } else {
        res.json({
            message: "Cannot request."
        });
    }
    // console.log(req.url);
    // console.log(req.method);

});

// // therd paty
// app.use(morgan('combined'));

// login test
// app.use((req, res, next) => {
//     let isAuth = false;

//     if (isAuth) {
//         next();
//     } else {
//         res.json({
//             message: "You need to login."
//         })
//     }
// });
// function isAuth(req, res, next) {
//     let isAuth = false;

//     if (isAuth) {
//         next();
//     } else {
//         res.json({
//             message: "You need to login."
//         })
//     }
// };

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to homepage'
    })
});

app.get('/contact', (req, res) => {
    res.json({
        msg: 'Welcome to contact'
    })
});

app.listen(3000, () => {
    console.log("Server run on port 3000");
});