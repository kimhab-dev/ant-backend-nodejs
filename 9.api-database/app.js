const express = require("express");
const mysql = require('mysql2/promise');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'ecommerce'
});

app.get('/products', async (req, res) => {
    try {
        let [rows] = await pool.query('select * from products');
        res.status(200).json({
            message: "Get Successfully.",
            resut: true,
            data: rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        })
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})