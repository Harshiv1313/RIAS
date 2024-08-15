// backend/routes/adminAnalysis.js

const express = require('express');
const router = express.Router();
const { getFeedbackAnalysis } = require('../controllers/adminAnalysis'); // Adjust path as necessary

// Route to get feedback analysis
router.get('/feedback-analysis', getFeedbackAnalysis);

module.exports = router;
