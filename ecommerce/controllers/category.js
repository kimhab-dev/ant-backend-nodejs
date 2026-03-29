const category = require('../services/category');

const getById = async (req, res) => {
    try {
        const row = await category.getById(req.params.id);
        console.log(row);
    } catch (err) {
        return res.json({
            result: false,
            message: "get category fail.",
            details: err.message
        })
    }
}

const create = async (req, res) => {
    try {
        const row = await category.create(req.body);
        console.log(row);
    } catch (err) {
        console.log(err);
        return res.json({
            result: false,
            message: "get category fail.",
            details: err.message
        })
    }
}

module.exports = { getById, create }