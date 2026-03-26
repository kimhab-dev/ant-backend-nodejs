const pool = require('../config/db');

const getByEmail = async (email) => {
    let [row] = await pool.query("SELECT email FROM users WHERE id = ?", [email]);
    return row;
}

module.exports = {
    getByEmail
}