const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'ecommerce'
});

router.get('/categories', async (req, res) => {
    try {
        let [rows] = await pool.query('select * from categories');
        res.status(200).json({
            message: "Get category successfully.",
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

router.post('/categories', async (req, res) => {
    try {
        let body = req.body;
        let [getName] = await pool.query('select name from categories');
        for (n of getName) {
            if (body.name === n.name) {
                return res.json({
                    result: false,
                    message: "Data exit have.",
                })
            }
        }
        let sql = 'insert into categories (name) values (?)';

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

router.put('/categories/:id', async (req, res) => {
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

router.delete('/categories/:id', async (req, res) => {
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
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;