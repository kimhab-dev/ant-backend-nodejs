const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    remove,
    getById
} = require('../controllers/productController')

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', create);
router.put('/products/:id', update);
router.delete('/products/:id', remove);

module.exports = router;