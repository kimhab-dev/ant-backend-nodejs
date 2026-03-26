const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kdamprai@17',
    database: 'auth_exercise'
});

module.exports = db;