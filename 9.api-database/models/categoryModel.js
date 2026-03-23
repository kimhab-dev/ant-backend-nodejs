const pool = require('../config/db');

const getAll = async () => {
    let [rows] = await pool.query('select * from categories');
    return rows;
};

const getById = async (id) => {
    let [row] = await pool.query('select * from categories where id = ?', [id]);
    return row;
};

const create = async (body) => {
    const [result] = await pool.query('insert into categories (name) values (?)', [body.name]);
    return result.insertId;
}

const update = async (body, id) => {
    let sql = 'update categories set name = ? where id = ?';
    let data = [body.name, id];
    const result = await pool.query(sql, data);
    return result;
}

const remove = async (id) => {
    await pool.query('delete from categories where id = ?', id);
}

module.exports = {
    getAll,
    getById,
    update,
    create,
    remove
}