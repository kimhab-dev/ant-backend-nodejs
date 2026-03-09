const express = require('express');
const _ = require('lodash')

const app = express();

app.get('/', async (req, res) => {

    res.json({
        randomNumber: _.random(1, 100),
    })

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})