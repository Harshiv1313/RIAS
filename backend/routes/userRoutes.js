// userRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Register User
router.post('/register', userController.register);

// Login User
router.post('/login', userController.login);

// Get All Users
router.get('/', userController.getUsers);

// Get User by ID
router.get('/user/:id', authMiddleware, userController.getUserById);

// Update User Info
router.put('/user/:id', authMiddleware, userController.updateUserInfo);

// Get User Info (logged-in user)
router.get('/me', authMiddleware, userController.getUserInfo);

module.exports = router;
