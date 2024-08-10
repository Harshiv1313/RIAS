const Feedback = require('../models/Feedback');

// Submit theory feedback
exports.submitTheoryFeedback = async (req, res) => {
  try {
    const { studentId, feedbackEntries } = req.body;
    if (!feedbackEntries || !Array.isArray(feedbackEntries)) {
      return res.status(400).json({ message: 'Invalid feedback data' });
    }

    // Save all theory feedback entries
    await Feedback.insertMany(feedbackEntries.map(entry => ({
      studentId,
      ...entry
    })));

    res.status(201).json({ message: 'Theory feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting theory feedback', error });
  }
};

// Submit practical feedback
exports.submitPracticalFeedback = async (req, res) => {
  try {
    const { studentId, feedbackEntries } = req.body;
    if (!feedbackEntries || !Array.isArray(feedbackEntries)) {
      return res.status(400).json({ message: 'Invalid feedback data' });
    }

    // Save all practical feedback entries
    await Feedback.insertMany(feedbackEntries.map(entry => ({
      studentId,
      ...entry
    })));

    res.status(201).json({ message: 'Practical feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting practical feedback', error });
  }
};

// Get feedback by student ID
exports.getFeedbackByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const feedback = await Feedback.find({ studentId })
      .populate('studentId', 'username email mobileNumber registrationNumber semester branch section rollNumber');
    
    if (feedback.length > 0) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'No feedback found for this student' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};
