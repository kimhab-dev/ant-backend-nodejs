const pool = require('../config/db');

const getAll = async () => {
    const [row] = await pool.query('select * from products');
    return row;
};

const getById = async (id) => {
    const [row] = await pool.query('select * from products where id = ?', [id]);
    return row;
}

const create = async (body) => {
    let sql = 'insert into products (name, category, description) values (?, ?, ?)';
    let data = [body.name, body.category, body.description];
    const [result] = await pool.query(sql, data);
    return result.insertId;
}

const update = async (body, id) => {
    let sql = 'update products set name = ?, category = ?, description = ? where id = ?';
    let data = [body.name, body.category, body.description, id];
    await pool.query(sql, data);

    const [result] = await pool.query('select * from products where id = ?', [id]);
    return result;
}

const remove = async (id) => {
    const result = await pool.query('delete from products where id = ?', [id]);
    return result
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}