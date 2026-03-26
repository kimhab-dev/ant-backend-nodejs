const express = require('express')
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/users', authController.getAll)
router.post('/register', authController.create);
router.post('/login', authController.login);

module.exports = router;


