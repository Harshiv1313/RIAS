const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController'); // Correct import

// Route to register a user
router.post('/register', register);

// Route to login a user
router.post('/login', login);

module.exports = router; // Fix the module export
