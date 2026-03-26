const authModel = require('../models/authModel');

const getAll = async () => {
    return await authModel.getAll();
}

const getById = async (id) => {
    const row = await authModel.getById(id);
    return row;
}

const create = async (body) => {
    const row = await authModel.create(body);
    return authModel.getById(row);
};

const login = async (body) => {
    return await authModel.login(body);
}


module.exports = {
    getAll,
    getById,
    create,
    login
}