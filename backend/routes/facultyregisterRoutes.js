// routes/facultyregisterRoutes.js
const express = require('express');
const router = express.Router();
const facultyregisterController = require('../controllers/facultyregisterController');

// Register faculty
router.post('/create/faculty', facultyregisterController.createFaculty);

// Add other routes if needed

module.exports = router;
