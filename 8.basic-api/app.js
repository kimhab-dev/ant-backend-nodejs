const express = require('express');

const app = express();
app.use(express.json());// middleware for covert data from user to js object

let products = [
    { id: 1, name: "BMW S1000rr", category: "bike", description: "test" },
    { id: 2, name: "GTR R-35", category: "car", description: "test" },
    { id: 3, name: "YAMAHA R1M", category: "bike", description: "test" },
]

app.get("/products", (req, res) => {
    res.json({
        result: true,
        message: "Get products success.",
        data: products
    });
});

app.post("/products", (req, res) => {
    console.log(req.body);
    res.status(201).json(
        {
            result: true,
            message: "Create product success.",
            data: [
                req.body
            ]
        }
    )
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});