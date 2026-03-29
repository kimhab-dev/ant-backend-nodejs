const express = require('express');
const auth = require('./routes/auth');
const product = require('./routes/product');

const app = express();
app.use(express.json());

app.use(auth);
app.use(product);

app.listen(3000, () => {
    console.log("server running on port 3000");
})