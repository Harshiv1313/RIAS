const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  reenterEmail: { type: String}, // New field
  mobileNumber: { type: String }, // New field
  registrationNumber: { type: String }, // New field
  semester: { type: String }, // New field
  branch: { type: String }, // New field
  section: { type: String }, // New field
  rollNumber: { type: String}, // New field
  password: { type: String, required: true },
  reenterPassword: { type: String}, // New field
  role: { type: String, required: true },
  isApproved: { type: Boolean, default: false }
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
