// controllers/facultyregisterController.js
const Faculty = require('../models/facultyModel'); // Adjust path if needed

// Create a new faculty
exports.createFaculty = async (req, res) => {
  try {
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(201).json({ message: 'Faculty registered successfully', data: newFaculty });
  } catch (error) {
    res.status(400).json({ message: 'Error registering faculty', error: error.message });
  }
};

// Add other CRUD operations if needed
