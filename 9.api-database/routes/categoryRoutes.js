const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove,
    getById
} = require('../controllers/categoryController')

router.get('/categories', getAll);
router.get('/categories/:id', getById);
router.post('/categories', create);
router.put('/categories/:id', update);
router.delete('/categories/:id', remove);

module.exports = router;