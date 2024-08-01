const express = require('express');
const router = express.Router();
const { getUnapprovedUsers, approveUser } = require('../controllers/facultyController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure only authorized users can access

// Get all unapproved users
router.get('/unapproved-users', authMiddleware, getUnapprovedUsers);

// Approve user route
router.post('/approve-user/:userId', authMiddleware, approveUser);

module.exports = router;
