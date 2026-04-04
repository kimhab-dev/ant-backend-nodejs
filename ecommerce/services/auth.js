const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')

const register = async (body) => {
    if (!body.name || !body.email || !body.password) {
        throw new Error("name, email and password is require");
    }

    const checkemail = await user.getByEmail(body.email);
    if (checkemail.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // const result = await user.register({ ...body, hashedPassword });
    const result = await user.register({
        name: body.name,
        email: body.email,
        password: hashedPassword
    });

    const [row] = await user.getRegister(result);
    return row;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error("email and password is require.");
    }
    const row = await user.userInfor(body.email);
    if (row.length === 0) {
        throw new Error("User not found.");
    }
    const data = row[0];
    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
        throw new Error("invalid username or password.");
    }

    const token = jwt.sign(
        { id: data.id, name: data.name },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    // insert token into data   
    await user.addToken(token, data.id);

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        is_active: data.is_active,
        created_at: data.created_at,
        token
    };
}

module.exports = {
    register,
    login,
}