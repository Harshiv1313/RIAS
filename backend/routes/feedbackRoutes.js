// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Route to get feedback by student ID (for admin)
router.get('/:studentId', feedbackController.getFeedbackByStudent);

module.exports = router;
