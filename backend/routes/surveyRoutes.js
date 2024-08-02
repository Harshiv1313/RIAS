const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const surveyController = require('../controllers/surveyController');

// Ensure these imports are correct and the paths match your project structure

// Create Survey
router.post('/create', authMiddleware, surveyController.createSurvey);

// Optional: Update or delete routes
// Ensure you have controllers for these methods if you're using them
// router.put('/update/:id', authMiddleware, surveyController.updateSurvey);
// router.delete('/delete/:id', authMiddleware, surveyController.deleteSurvey);

module.exports = router;
