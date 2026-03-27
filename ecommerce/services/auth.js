const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (body) => {
    if (!body.name || !body.email || !body.password) {
        throw new Error("name, email and password is require");
    }

    const checkemail = await user.getByEmail(body.email);
    if (checkemail.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const result = await user.register({ ...body, hashedPassword });
    const [row] = await user.getRegister(result);
    return row;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error("email and password is require.");
    }
    const row = await user.login(body);
    if (row.length === 0) {
        throw new Error("User not found.")
    }
    const data = row[0];
    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
        throw new Error("Invalid password.");
    }

    // payload to generate token
    const payload = {
        email: data.email,
        role: data.role
    }

    const token = jwt.sign(payload, "SECRET_KEY", {
        expiresIn: "1h"
    });

    return { data, token };
}

module.exports = {
    register,
    login,
}