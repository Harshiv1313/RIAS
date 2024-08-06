const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  form: {
    type: String, // Store feedback form as a JSON string or any other format
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  isSubmitted: {
    type: Boolean,
    default: false
  },
  response: {
    type: String // Store student’s feedback response
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
