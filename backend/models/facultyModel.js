const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyName: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time'],
    required: true
  },
  batch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Faculty', facultySchema);
