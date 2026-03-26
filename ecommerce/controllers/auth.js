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
        return res.json({
            result: false,
            message: "Register fail.",
            data: err
        });
    }
}

module.exports = {
    register
}