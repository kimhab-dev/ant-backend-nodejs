const express = require('express');
const userRoute = require('./routes/userRoute')

const app = express();
app.use(express.json());

app.use(userRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})