const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());// middleware for covert data from user to js object
app.use(cors());

let products = [];
let id = 0;
app.get("/products", (req, res) => {
    res.json({
        result: true,
        message: "Get products success.",
        data: products
    });
});

app.post("/products", (req, res) => {
    id++;
    let newProduct = {
        id: id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    }
    products.push(newProduct);
    console.log(products);
    res.status(201).json(
        {
            result: true,
            message: "Create product success.",
            data: newProduct
        }
    )
});

app.put("/products/:id", (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    if (!product) {
        res.json(
            {
                result: false,
                message: "Not Found Product."
            }
        );
        return;
    }

    if (product) {
        res.json(
            {
                result: true,
                message: "Update product success.",
                data: product
            }
        );
        return;
    }
})

app.delete("/products/:id", (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    let index = products.indexOf(product);
    if (!product) {
        res.json(
            {
                result: false,
                message: "Not Found Product."
            }
        );
        return;
    }
    if (product) {
        products.splice(index, 1);
        res.json(
            {
                result: true,
                message: "Delete Success."
            }
        );
        return;
    }
});

app.get("/products/:id", (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    if (!product) {
        res.json(
            {
                result: false,
                message: "Product not found."
            }
        )
    }
    if (product) {
        res.json(
            {
                result: true,
                message: "Get product success.",
                data: product
            }
        )
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});