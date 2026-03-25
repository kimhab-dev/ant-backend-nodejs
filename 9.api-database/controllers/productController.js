const productService = require('../service/productService');

const getAll = async (req, res) => {
    try {
        const rows = await productService.getAll();
        res.status(200).json({
            message: "Get Successfully.",
            resut: true,
            totalItem: rows.length,
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

const getById = async (req, res) => {
    const isData = await productService.getById(req.params.id);

    if (!isData[0]) {
        res.json({
            result: false,
            message: "Product not found."
        });
        return;
    }

    try {
        const [rows] = await productService.getById(req.params.id);
        res.status(200).json({
            message: "Get Successfully.",
            resut: true,
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
        const result = await productService.create(req.body);
        return res.json({
            result: true,
            message: "Create product successfully",
            data: result[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
}

const update = async (req, res) => {
    const isData = await productService.getById(req.params.id);

    if (isData.length == 0) {
        res.json({
            result: false,
            message: "Product not found."
        });
        return;
    }

    try {
        const row = await productService.update(req.body, req.params.id);

        res.json({
            result: true,
            message: "Update product successfully.",
            data: row
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        })
    }
}

const remove = async (req, res) => {
    const isData = await productService.getById(req.params.id);

    if (!isData[0]) {
        res.json({
            result: false,
            message: "Product not found."
        });
        return;
    }

    try {
        productService.remove(req.params.id);
        res.json({
            result: true,
            message: "Delete category successfully."
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById
};