const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove
} = require('../controllers/categoryController')

router.get('/categories', getAll);

router.post('/categories', create);

router.put('/categories/:id', update);

router.delete('/categories/:id', remove);

module.exports = router;