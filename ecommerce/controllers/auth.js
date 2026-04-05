const auth = require('../services/auth')

const register = async (req, res) => {
    try {
        const result = await auth.register(req.body);
        return res.json({
            result: true,
            message: "Register successfully.",
            data: result
        });
    } catch (err) {
        console.log(err);
        return res.json({
            result: false,
            message: "Register fail.",
            data: err.message
        });
    }
}

const login = async (req, res) => {
    try {
        const data = await auth.login(req.body);
        // const result = {
        //     id: data.id,
        //     name: data.name,
        //     email: data.email,
        //     role: data.role,
        //     is_active: data.is_active,
        //     created_at: data.created_at
        // }
        return res.json({
            result: true,
            message: "login successfully.",
            data: data,
        })

    } catch (err) {
        return res.json({
            result: false,
            message: "Login fail.",
            data: err.message
        });
    }
}

const getMe = async (req, res) => {
    try {
        const row = await auth.getMe(req.user);
        return res.json({
            result: true,
            message: "get profile successfully.",
            data: row,
        })
    } catch (error) {

    }
}

module.exports = {
    register,
    login,
    getMe
}