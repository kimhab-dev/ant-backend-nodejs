const pool = require('../config/db')

const getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

const findEmail = async (email) => {
    const sql = 'SELECT email FROM users WHERE email = ? LIMIT 1';
    const [data] = await pool.query(sql, [email]);
    return data[0];
}

const create = async (body) => {
    let sql = 'INSERT INTO users (name, email) values (?, ?)';
    let data = [body.name, body.email];
    const [result] = await pool.query(sql, data);
    return result.insertId;
}

const getById = async (id) => {
    const [row] = await pool.query('select * from users where id = ?', [id]);
    return row;
}

const setActive = async (id) => {
    const sql = 'UPDATE users SET is_active = ? WHERE id = ?';
    const [result] = await pool.query(sql, [1, id]);
    return result;
}

const setInActive = async (id) => {
    const sql = 'UPDATE users SET is_active = ? WHERE id = ?';
    const [result] = await pool.query(sql, [0, id]);
    return result;
}

const remove = async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
}

module.exports = {
    create,
    getById,
    getAll,
    findEmail,
    setActive,
    setInActive,
    remove
}