const Timetable = require('../models/Timetable');

// Create a new timetable
exports.createTimetable = async (req, res) => {
  try {
    const { branch, section, semester, batch, timetable, facultyName, subjectName, courseCode, type, time, room } = req.body;

    const newTimetable = new Timetable({
      branch,
      section,
      semester,
      batch,       // New field
      timetable,
      facultyName,
      subjectName,
      courseCode,
      type,
      time,
      room,
      createdBy: req.user._id // Assuming req.user is set by authentication middleware
    });

    await newTimetable.save();
    res.status(201).json(newTimetable);
  } catch (error) {
    console.error('Error creating timetable:', error);
    res.status(500).json({ message: 'Failed to create timetable' });
  }
};

// Get timetables based on filters
exports.getTimetables = async (req, res) => {
  try {
    const { branch, section, semester, batch } = req.query; // Include batch in the query
    const query = {};

    if (branch) query.branch = branch;
    if (section) query.section = section;
    if (semester) query.semester = semester;
    if (batch) query.batch = batch; // Add batch filter

    const timetables = await Timetable.find(query);
    res.status(200).json(timetables);
  } catch (error) {
    console.error('Error fetching timetables:', error);
    res.status(500).json({ message: 'Failed to fetch timetables' });
  }
};

// Get Timetables by Semester, Branch, and Section
// Controller for fetching timetables by criteria
exports.getTimetablesByCriteria = async (req, res) => {
  const { semester, branch, section, batch } = req.query; // Include batch in the query

  try {
    const query = {};
    if (semester) query.semester = semester;
    if (branch) query.branch = branch;
    if (section) query.section = section;
    if (batch) query.batch = batch; // Add batch filter

    const timetables = await Timetable.find(query);
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
