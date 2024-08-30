const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  const {
    username, email, password, role,
    mobileNumber, registrationNumber, semester, branch, section, rollNumber, batch, session, academicYear
  } = req.body; // Added academicYear to destructuring

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username, email, password, role,
      mobileNumber, registrationNumber, semester, branch, section, rollNumber, batch, session, academicYear // Added academicYear field
    });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.isApproved !== true) {
      console.log('User not approved');
      return res.status(403).json({ msg: 'User not approved' });
    }

    // Handle both plaintext and hashed passwords
    let isMatch = false;
    const passwordIsHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');

    if (passwordIsHashed) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // If the password is stored in plaintext, directly compare it
      isMatch = password === user.password;
    }

    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password incorrect');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, role: user.role } });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
};