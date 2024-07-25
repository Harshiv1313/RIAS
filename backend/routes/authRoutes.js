const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Ensure these match your frontend requests
router.post('/register', register); // Accessible at /api/register
router.post('/login', login);       // Accessible at /api/login

module.exports = router;
