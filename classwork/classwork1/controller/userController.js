const userService = require('../service/userService')
const userModel = require('../model/userModel');

const create = async (req, res) => {
    try {
        const isEmail = await userModel.findEmail(req.body.email);
        if (isEmail) {
            res.json({
                result: false,
                msg: "Email alredy is use."
            });
            return;
        }
        const [row] = await userService.create(req.body);
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

const getAll = async (req, res) => {
    try {
        const row = await userService.getAll();
        res.status(200).json({
            message: "Get all user successfully.",
            resut: true,
            totalItem: row.length,
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
        const isData = await userService.getById(req.params.id);

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

const setActive = async (req, res) => {
    try {
        const row = await userService.setActive(req.params.id);
        const isData = await userService.getById(req.params.id);

        if (isData.length === 0) {
            return res.status(404).json({
                result: false,
                msg: "User not found."
            });
        }

        res.status(200).json({
            message: "Update status successfully.",
            resut: true,
            data: row
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

const setInActive = async (req, res) => {
    try {
        const row = await userService.setInActive(req.params.id);
        const isData = await userService.getById(req.params.id);

        if (isData.length === 0) {
            return res.status(404).json({
                result: false,
                msg: "User not found."
            });
        }

        res.status(200).json({
            message: "Update status successfully.",
            resut: true,
            data: row
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

const remove = async (req, res) => {
    try {
        const isData = await userService.getById(req.params.id);

        if (isData.length === 0) {
            return res.status(404).json({
                result: false,
                msg: "User not found."
            });
        }

        await userService.remove(req.params.id);

        res.status(200).json({
            resut: true,
            message: "Delete user successfully."

        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: "Internal Server Error."
        });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    setActive,
    setInActive,
    remove
}