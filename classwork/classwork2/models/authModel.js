const pool = require('../config/db')

const getAll = async () => {
    let [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
    return rows;
}

const create = async (body) => {
    let sql = 'INSERT INTO users (name, email, password) values (?, ?, ?)';
    let data = [body.name, body.email, body.password];
    const [result] = await pool.query(sql, data);
    return result.insertId;
}

const findEmail = async (email) => {
    let [result] = await pool.query('SELECT email FROM users WHERE email = ? LIMIT 1', [email]);
    return result[0];
}

const login = async (body) => {
    const sql = 'SELECT name, email, password, created_at FROM users WHERE email = ? AND password = ?'; // this code is not good. we can use bcrypt for pass
    const data = [body.email, body.password];
    const [result] = await pool.query(sql, data);
    return result[0];
}

const getById = async (id) => {
    const [row] = await pool.query('select name, email from users where id = ?', [id]);
    return row;
}

module.exports = {
    getAll,
    create,
    getById,
    login,
    findEmail
}