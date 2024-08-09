const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Import and use routes
const authRoutes = require("./routes/authRoutes");
const classSchedulesRoutes = require("./routes/classSchedules");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const facultytt = require("./routes/facultytimetable");

app.use("/api", authRoutes); // Authentication routes
app.use("/api/class-schedules", classSchedulesRoutes); // Class schedules routes
app.use("/api/users", userRoutes); // User routes (renamed for clarity)
app.use("/api/students", studentRoutes); // Student routes
app.use("/api/faculty", facultyRoutes); // Faculty routes
app.use("/api/surveys", surveyRoutes); // Surveys routes
app.use("/api/feedback", feedbackRoutes); // Feedback routes
app.use("/api", timetableRoutes); // Update route prefix as needed
app.use("/api", facultytt);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
