const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to submit theory feedback
router.post('/theory/submit', feedbackController.submitTheoryFeedback);

// Route to submit practical feedback
router.post('/practical/submit', feedbackController.submitPracticalFeedback);

// Route to get feedback by student ID (for admin)
router.get('/:studentId', feedbackController.getFeedbackByStudent);

module.exports = router;
