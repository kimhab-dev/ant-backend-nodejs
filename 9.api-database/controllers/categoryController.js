const categoryService = require('../service/categoryService')

const getAll = async (req, res) => {
    try {
        const rows = await categoryService.getAll();

        res.status(200).json({
            message: "Get category successfully.",
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
    const isData = await categoryService.getById(req.params.id);

    if (!isData[0]) {
        res.json({
            result: false,
            message: "Category not found."
        });
        return;
    }
    try {
        const row = await categoryService.getById(req.params.id);
        res.status(200).json({
            message: "Get category successfully.",
            resut: true,
            data: row[0]
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
        // let [getName] = await pool.query('select name from categories');
        // for (n of getName) {
        //     if (body.name === n.name) {
        //         return res.json({
        //             result: false,
        //             message: "Data exit have.",
        //         })
        //     }
        // }
        const [row] = await categoryService.create(req.body);

        return res.json({
            result: true,
            message: "Create categories successfully",
            data: row
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
};

const update = async (req, res) => {
    const isData = await categoryService.getById(req.params.id);

    if (!isData[0]) {
        res.json({
            result: false,
            message: "Category not found."
        });
        return;
    }

    try {
        await categoryService.update(req.body, req.params.id);
        const [row] = await categoryService.getById(req.params.id);
        res.json({
            result: true,
            message: "Update categories successfully.",
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
    try {
        const isData = await categoryService.getById(req.params.id);

        if (!isData[0]) {
            res.json({
                result: false,
                message: "Category not found."
            });
            return;
        }

        await categoryService.remove(req.params.id);

        res.json({
            result: true,
            message: "Delete categories successfully."
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById
}