const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Define route for submitting feedback
router.post('/submit', feedbackController.submitFeedback);

// Define route for getting feedback by student ID
router.get('/:studentId', feedbackController.getFeedbackByStudent);

module.exports = router;
