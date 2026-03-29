const product = require("../models/product");
const getAll = async () => {
    const rows = await product.getAll();
    return rows;
}

const getById = async (id) => {
    const row = await product.getById(id);
    if (row.length === 0) {
        throw new Error("Products not found.");
    }
    return row;
}

const create = async (body) => {
    const result = await product.create(body);
    const row = await product.getById(result);
    return row;
}

module.exports = { getAll, getById, create };