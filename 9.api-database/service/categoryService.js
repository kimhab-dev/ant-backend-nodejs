const categoryModel = require('../models/categoryModel');

const getAll = async () => {
    const result = await categoryModel.getAll();
    return result;
}

const getById = async (id) => {
    return await categoryModel.getById(id);
}

const create = async (body) => {
    const result = await categoryModel.create(body);
    return await categoryModel.getById(result);
}

const update = async (body, id) => {
    return await categoryModel.update(body, id);
}

const remove = async (id) => {
    await categoryModel.remove(id);
}

module.exports = {
    getAll,
    getById,
    update,
    create,
    remove
}