const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, getMe, logout, refresh, verifyEmail, resendVerifycationEmail } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.delete('/logout', authMiddleware, logout);
router.post('/refresh', refresh);
router.get('/verify-email', verifyEmail);
router.put('/resend-email', resendVerifycationEmail);

module.exports = router;