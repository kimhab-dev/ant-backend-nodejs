const authService = require('../services/authService');
const authModel = require('../models/authModel');

const getAll = async (req, res) => {
    try {
        const rows = await authService.getAll();
        return res.json({
            result: true,
            msg: "Get all user successfully",
            data: rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                result: false,
                msg: "name is require."
            });
        }
        if (!email) {
            return res.json({
                result: false,
                msg: "email is require."
            });
        }
        if (!password) {
            return res.json({
                result: false,
                msg: "password is require."
            });
        }

        const isEmail = await authModel.findEmail(req.body.email);

        if (isEmail) {
            return res.json({
                result: false,
                msg: "Email is already in use."
            });
        }

        const [row] = await authService.create(req.body);
        res.status(200).json({
            message: "Create user successfully.",
            resut: true,
            data: row
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

const getById = async (req, res) => {
    try {
        const isData = await authService.getById(req.params.id);

        if (isData.length === 0) {
            return res.status(404).json({
                result: false,
                msg: "User not found."
            });
        }

        res.status(200).json({
            message: "Get a user successfully.",
            resut: true,
            data: row
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.json({
                result: false,
                msg: "email is require."
            });
        }
        if (!password) {
            return res.json({
                result: false,
                msg: "password is require."
            });
        }

        const result = await authService.login(req.body);
        console.log(result);
        if (!result) {
            return res.status(401).json({
                result: false,
                msg: "Invalid email orr password."
            });
        }

        res.status(200).json({
            message: "Login Successfully",
            result: true,
            data: {
                name: result.name,
                email: result.email,
                created_at: result.created_at
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}


module.exports = {
    getAll,
    create,
    getById,
    login
}