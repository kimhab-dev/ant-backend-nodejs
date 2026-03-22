const pool = require('../config/db');
const getAll = async function () {
    let rows = await pool.query('select * from products');
    return rows;
};

const create = async function (body) {
    let sql = 'insert into products (name, category, description) values (?, ?, ?)';
    let data = [body.name, body.category, body.description];
    const [result] = await pool.query(sql, data);
    const [row] = await pool.query('select * from products where id = ?', [result.insertId]);

    return row;
}

module.exports = {
    getAll,
    create
}