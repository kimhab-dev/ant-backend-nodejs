const user = require('../models/user');

const register = async (body) => {
    if (!body.name || !body.email || !body.password) {
        throw new Error("name, email and password is require");
    }

    const checkemail = await user.getByEmail(body.email);
    console.log(checkemail)
    if (checkemail.length > 0) {
        throw new Error("Email Dublicate.");
    }

    return body;
}

module.exports = {
    register
}