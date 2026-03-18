const express = require("express");
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

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
        });
    }
});

app.post('/products', async (req, res) => {
    try {
        let sql = 'insert into products (name, category, description) values (?, ?, ?)';
        let body = req.body;
        let data = [body.name, body.category, body.description];

        const [result] = await pool.query(sql, data);
        const [row] = await pool.query('select * from products where id = ?', [result.insertId]);

        return res.json({
            result: true,
            message: "Create product successfully",
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const [isData] = await pool.query('select * from products where id = ?', [req.params.id]);

        if (!isData[0]) {
            res.json({
                result: false,
                message: "Product not found."
            });
            return;
        }
        let sql = 'update products set name = ?, category = ?, description = ? where id = ?';

        let body = req.body;
        let data = [body.name, body.category, body.description, [req.params.id]];

        await pool.query(sql, data);

        const [row] = await pool.query('select * from products where id = ?', [req.params.id]);

        res.json({
            result: true,
            message: "Update product successfully.",
            data: row[0]
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        })
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        let sql = 'delete from products where id = ?';
        const [row] = await pool.query('select * from products where id = ?', [req.params.id]);

        if (!row[0]) {
            res.json({
                result: false,
                message: "Product not found."
            });
            return;
        }

        await pool.query(sql, Number(req.params.id));

        res.json({
            result: true,
            message: "Delete category successfully."
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        })
    }
});

app.get('/categories', async (req, res) => {
    try {
        let [rows] = await pool.query('select * from categories');
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
        });
    }
});

app.post('/categories', async (req, res) => {
    try {

        let [getName] = await pool.query('select name from categories');
        console.log(getName)

        return;
        let sql = 'insert into categories (name) values (?)';
        let body = req.body;
        let data = [body.name];

        const [result] = await pool.query(sql, data);
        const [row] = await pool.query('select * from categories where id = ?', [result.insertId]);

        return res.json({
            result: true,
            message: "Create categories successfully",
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
});

app.put('/categories/:id', async (req, res) => {
    try {
        const [isData] = await pool.query('select * from categories where id = ?', [req.params.id]);

        if (!isData[0]) {
            res.json({
                result: false,
                message: "categories not found."
            });
            return;
        }
        let sql = 'update categories set name = ? where id = ?';

        let body = req.body;
        let data = [body.name, [req.params.id]];

        await pool.query(sql, data);

        // console.log(result);

        const [row] = await pool.query('select * from categories where id = ?', [req.params.id]);

        res.json({
            result: true,
            message: "Update categories successfully.",
            data: row[0]
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        })
    }
});

app.delete('/categories/:id', async (req, res) => {
    try {
        let sql = 'delete from categories where id = ?';
        const [row] = await pool.query('select * from categories where id = ?', [req.params.id]);

        if (!row[0]) {
            res.json({
                result: false,
                message: "Categories not found."
            });
            return;
        }

        await pool.query(sql, Number(req.params.id));

        res.json({
            result: true,
            message: "Delete categories successfully."
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
})