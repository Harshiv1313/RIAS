// adminAnalysis.js
const express = require('express');
const router = express.Router();
const adminAnalysisController = require('../controllers/adminAnalysis');

router.get('/feedback-analysis', adminAnalysisController.getFeedbackAnalysis);

module.exports = router;
