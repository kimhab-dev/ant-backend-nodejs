const express = require('express');
const routesUser = require('./routes/user.js')


const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000")
});

app.use(express.json());
app.use("/user", routesUser);

// app.get("/", (req, res) => {
//     // res.send("hello from backend")
//     // res.download('../')
//     res.json({ message: "hello from backend" });

// })

// app.post("/", (req, res) => {
//     console.log(req.body);
//     res.json({ message: "Create Success", data: req.body })
// })