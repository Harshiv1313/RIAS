const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Register User
router.post('/register', userController.register);

// Login User
router.post('/login', userController.login);

// Get All Users
router.get('/', authMiddleware, userController.getUsers);

// Get User by ID
router.get('/user/:id', authMiddleware, userController.getUserById);

// Update User Info
router.put('/user/:id', authMiddleware, userController.updateUserInfo);

// Get User Info (logged-in user)
router.get('/me', authMiddleware, userController.getUserInfo);

// Get All Students
router.get('/students', authMiddleware, userController.getStudents);

router.get('/branches', authMiddleware, userController.getBranches);


// Get All Sections
router.get('/sections', authMiddleware, userController.getSections);

// Get All Semesters
router.get('/semesters', authMiddleware, userController.getSemesters);


router.get('/students/criteria', authMiddleware, userController.getStudentsByCriteria);

module.exports = router; // Corrected module. Exports
