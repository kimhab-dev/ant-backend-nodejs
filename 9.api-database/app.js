const express = require("express");
const mysql = require('mysql2/promise');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'ecommerce'
});

app.use(productRoutes);
app.use(categoryRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})