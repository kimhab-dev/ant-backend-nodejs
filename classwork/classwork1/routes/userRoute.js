const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/user', userController.create);
router.get('/user', userController.getAll);
router.get('/user/:id', userController.getById);
router.put('/user/:id/active', userController.setActive);
router.put('/user/:id/inactive', userController.setInActive);
router.delete('/user/:id', userController.remove)

module.exports = router;
