const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  batch: { type: String, required: true }, // Added field
  timetable: { type: String, required: false }, // URL or path to the timetable file
  facultyName: { type: String, required: true },
  subjectName: { type: String, required: true },
  courseCode: { type: String, required: true },
  day: { type: String, required: true }, // Day of the week (e.g., Monday)
  time: { type: String, required: true }, // Time of the class (e.g., 10:00 AM - 11:00 AM)
  room: { type: String, required: true }, // Room number or identifier
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', timetableSchema);
