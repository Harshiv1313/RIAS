const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String },
  registrationNumber: { type: String },
  semester: { type: String },
  branch: { type: String },
  section: { type: String },
  rollNumber: { type: String },
  password: { type: String, required: true },
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
