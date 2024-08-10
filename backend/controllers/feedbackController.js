// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { studentId, responses } = req.body;
    const feedback = new Feedback({ studentId, responses });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

// Get feedback by student ID (optional for admin)
exports.getFeedbackByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const feedback = await Feedback.findOne({ studentId });
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'No feedback found for this student' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};
