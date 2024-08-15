const Feedback = require('../models/Feedback'); // Adjust path as necessary

exports.getFeedbackAnalysis = async (req, res) => {
  try {
    const { facultyName, courseName, type, semester, branch } = req.query;

    // Check for required parameters
    if (!facultyName || !courseName || !type || !semester || !branch) {
      return res.status(400).json({ message: "Faculty Name, Course Name, Type, Semester, and Branch are required" });
    }

    // Fetch feedbacks based on all criteria
    const feedbacks = await Feedback.find({
      facultyName,
      courseName,
      type,
      semester,
      branch
    });

    // Check if feedbacks are found
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found for the given criteria" });
    }

    // Initialize variables for analysis
    let totalScores = 0;
    let count = 0;
    let goodFeedbacks = 0;
    let badFeedbacks = 0;

    const questionScores = {};
    const questionCounts = {};

    // Process each feedback
    feedbacks.forEach(feedback => {
      const responses = feedback.responses || {};
      const keys = Object.keys(responses);

      keys.forEach(key => {
        // Exclude specific responses
        if (key === "0_Practical sessions were well-organized and conducted in a structured manner") {
          return;
        }

        const score = parseFloat(responses[key]);

        if (!isNaN(score)) {
          totalScores += score;
          count++;

          if (score >= 4) {
            goodFeedbacks++;
          } else if (score <= 2) {
            badFeedbacks++;
          }

          if (!questionScores[key]) {
            questionScores[key] = 0;
            questionCounts[key] = 0;
          }

          questionScores[key] += score;
          questionCounts[key]++;
        }
      });
    });

    // Calculate average score
    const averageScore = count > 0 ? ((totalScores / count) / 5 * 100).toFixed(2) : 0;

    // Calculate question averages
    const questionAverages = Object.keys(questionScores).reduce((acc, key) => {
      acc[key] = ((questionScores[key] / questionCounts[key]) / 5 * 100).toFixed(2) + '%';
      return acc;
    }, {});

    // Respond with analysis data
    res.json({
      averageScore: `${averageScore}%`,
      goodFeedbacks,
      badFeedbacks,
      totalFeedbacks: count,
      questionAverages
    });
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    res.status(500).json({ message: "Error analyzing feedback", error });
  }
};
