// D:\RIAS\backend\routes\antiragging.js
const express = require('express');
const router = express.Router();
const AntiraggingController = require('../controllers/Antiragging');

// Define routes with correct handlers
router.post('/submit', AntiraggingController.submitComplaint);
router.get('/all', AntiraggingController.getAllComplaints);

module.exports = router;
