const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import and use the routes
const authRoutes = require('./routes/authRoutes');
const classSchedulesRoutes = require('./routes/classSchedules');
const userRoutes = require('./routes/userRoutes');

app.use('/api', authRoutes); // Authentication routes
app.use('/api/class-schedules', classSchedulesRoutes); // Class schedules routes
app.use('/api/user-info', userRoutes); // User info route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
