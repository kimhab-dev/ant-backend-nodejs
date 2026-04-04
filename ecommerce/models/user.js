const pool = require('../config/db');

const userInfor = async (email) => {
    let [row] = await pool.query("SELECT id, email, password, role, is_active, created_at FROM users WHERE email = ?", [email]);
    return row;
}

const getRegister = async (id) => {
    let [row] = await pool.query('SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?', [id]);
    return row;
}

const getById = async (id) => {
    let [row] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return row;
}

const register = async (user) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    let data = [user.name, user.email, user.password];
    let [row] = await pool.query(sql, data);
    return row.insertId;
}

const login = async (user) => {
    const [row] = await pool.query('SELECT * FROM users WHERE email = ?', [user.email]);
    return row;
}

const addToken = async (token, id) => {
    await pool.query('UPDATE users SET token = ? WHERE id = ?', [token, id]);
}

module.exports = {
    userInfor,
    register,
    getById,
    getRegister,
    login,
    addToken
}