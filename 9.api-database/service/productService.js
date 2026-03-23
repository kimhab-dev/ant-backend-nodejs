const productModel = require('../models/productModel')
const getAll = async function () {
    let rows = await productModel.getAll();
    return rows;
};

const getById = async (id) => {
    let row = await productModel.getById(id);
    return row;
}

const create = async function (body) {
    const row = await productModel.create(body);
    return productModel.getById(row);
}

const update = async (body, id) => {
    const row = await productModel.update(body, id);
    return row;
}

const remove = async (id) => {
    return await productModel.remove(id);
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}