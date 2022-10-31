const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getMe } = require('../controller/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);


module.exports = router;