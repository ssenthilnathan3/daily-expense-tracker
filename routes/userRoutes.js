const express = require('express');
const { loginUser, createUser, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', loginUser);
router.post('/users', createUser);
router.get('/users/:id', auth, getUser);

module.exports = router;
