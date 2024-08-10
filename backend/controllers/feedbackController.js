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
// Get feedback by student ID (optional for admin)
// Example of fetching feedback and populating details
exports.getFeedbackByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Fetch feedback with user and timetable details
    const feedback = await Feedback.findOne({ studentId })
      .populate('studentId', 'username email mobileNumber registrationNumber semester branch section rollNumber')
      .populate('timetable', 'branch section semester batch facultyName subjectName courseCode type time room');
    
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: 'No feedback found for this student' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};


