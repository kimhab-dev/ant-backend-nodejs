const pool = require('../config/db');

const getByEmail = async (email) => {
    let [row] = await pool.query("SELECT id, email, password, role, is_active, created_at FROM users WHERE email = ?", [email]);
    return row;
}

const getById = async (id) => {
    let [row] = await pool.query('SELECT id, name, email, role, is_active, created_at, token FROM users WHERE id = ?', [id]);
    return row;
}

const register = async (user) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    let data = [user.name, user.email, user.password];
    let [row] = await pool.query(sql, data);
    return row.insertId;
}

const addToken = async (token, id) => {
    await pool.query('UPDATE users SET token = ? WHERE id = ?', [token, id]);
}

module.exports = {
    getByEmail,
    register,
    getById,
    addToken
}