const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtConfig, refreshJwtConfig } = require('../config/jwt')

const register = async (body) => {
    if (!body.name || !body.email || !body.password) {
        throw new Error("name, email and password is require");
    }

    // check have email orr not
    const checkemail = await user.getByEmail(body.email);
    if (checkemail.length > 0) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // create new user
    // const result = await user.register({ ...body, hashedPassword });
    const result = await user.register({
        name: body.name,
        email: body.email,
        password: hashedPassword
    });

    const [row] = await user.getById(result);
    return row;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error("email and password is require.");
    }
    const row = await user.getByEmail(body.email);
    if (row.length === 0) {
        throw new Error("User not found.");
    }

    const data = row[0];

    console.log(row);

    // conpare password user and password in database
    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
        throw new Error("invalid username or password.");
    }

    // Access Token (short)
    const accessToken = jwt.sign(
        { id: data.id, name: data.name },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    // Refresh Token (long)
    // const refreshToken = jwt.sign(
    //     { id: data.id },
    //     refreshJwtConfig.secret,
    //     { expiresIn: "7d" }
    // );

    // save refresh token in DB
    // await user.addToken(refreshToken, data.id);
    await user.addToken(accessToken, data.id);


    const [userInfo] = await user.getById(data.id);

    delete userInfo.token;

    return {
        user: userInfo,
        token: accessToken
    };
}

const refreshToken = async (token) => {
    if (!token) {
        throw new Error("No token");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, jwtConfig.refreshSecret);
    } catch (err) {
        throw new Error("Invalid refresh token");
    }

    const row = await user.getById(decoded.id);

    if (row.length === 0 || row[0].token !== token) {
        throw new Error("Token not match");
    }

    const newAccessToken = jwt.sign(
        { id: decoded.id },
        jwtConfig.secret,
        { expiresIn: "15m" }
    );

    return { accessToken: newAccessToken };
};

const getMe = async (data) => {
    const [row] = await user.getById(data.id);
    // delete row.token;
    // return row;
    const userInfo = {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role,
        is_active: row.is_active,
        created_at: row.created_at
    }
    return userInfo;
}

const logout = async (id) => {
    await user.logout(id);
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    refreshToken
}