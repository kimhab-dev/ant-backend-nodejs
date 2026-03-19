const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'ecommerce'
});

router.get('/products', async (req, res) => {
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

router.post('/products', async (req, res) => {
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

router.put('/products/:id', async (req, res) => {
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

router.delete('/products/:id', async (req, res) => {
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

module.exports = router;