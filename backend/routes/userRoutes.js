const express = require('express');
const router = express.Router();
const { getUsers, getFaculty } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/users', authMiddleware, getUsers);
router.get('/faculty', authMiddleware, getFaculty);

module.exports = router;
