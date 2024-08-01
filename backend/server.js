// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import and use routes
const authRoutes = require('./routes/authRoutes');
const classSchedulesRoutes = require('./routes/classSchedules');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes'); // Add this import

app.use('/api', authRoutes); // Authentication routes
app.use('/api/class-schedules', classSchedulesRoutes); // Class schedules routes
app.use('/api/users', userRoutes); // User routes (renamed for clarity)
app.use('/api/students', studentRoutes); // Student routes
app.use('/api/faculty', facultyRoutes); // Add this route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
