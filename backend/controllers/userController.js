const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: 'faculty' }).select('-password');
    res.status(200).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
