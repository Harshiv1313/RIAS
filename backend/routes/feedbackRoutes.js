// routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');

// Route to send feedback to a specific student
router.post('/send-feedback', FeedbackController.sendFeedback);

module.exports = router;
