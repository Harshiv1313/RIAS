// controllers/feedbackController.js

const Student = require('../models/Student'); // Assuming a Student model exists

exports.sendFeedback = async (req, res) => {
    const { studentId, feedbackData } = req.body;

    try {
        // Find the student and update their feedback status
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Add feedback to the student document
        student.feedback.push(feedbackData);
        await student.save();

        res.status(200).json({ message: 'Feedback sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
