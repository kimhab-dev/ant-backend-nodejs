const userModel = require('../model/userModel');

const getAll = async () => {
    const rows = await userModel.getAll();
    return rows;
}

const getById = async (id) => {
    const row = await userModel.getById(id);
    return row;
}

const create = async (body) => {
    const row = await userModel.create(body);
    return userModel.getById(row);
};

const setActive = async (id) => {
    const result = await userModel.setActive(id);
    if (result.affectedRows != 0) {
        return await userModel.getById(id);
    }
};

const setInActive = async (id) => {
    const result = await userModel.setInActive(id);
    if (result.affectedRows != 0) {
        return await userModel.getById(id);
    }
};

const remove = async (id) => {
    return await userModel.remove(id);
}

module.exports = {
    create,
    getAll,
    getById,
    setActive,
    setInActive,
    remove
}