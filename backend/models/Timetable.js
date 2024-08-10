const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  batch: { type: String, required: true },
  timetable: { type: String, required: false },
  facultyName: { type: String, required: true },
  subjectName: { type: String, required: true },
  courseCode: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true },
  room: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', timetableSchema);
