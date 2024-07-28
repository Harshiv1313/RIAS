const express = require('express');
const router = express.Router();
const { getUsers, getFaculty, getUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all users, protected by authentication middleware
router.get('/users', authMiddleware, getUsers);

// Route to get faculty members, protected by authentication middleware
router.get('/faculty', authMiddleware, getFaculty);

// Add route for user info
router.get('/user-info', authMiddleware, getUserInfo);

module.exports = router; // Corrected export statement
