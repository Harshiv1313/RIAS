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










// Maximum score used for percentage calculation
const maxScore = 5;

exports.getFeedbackAnalysisBySubject = async (req, res) => {
  try {
    const { subjectName } = req.query;

    // Check for required parameter
    if (!subjectName) {
      return res.status(400).json({ message: "Subject Name is required" });
    }

    console.log("Subject Name Query:", subjectName);

    // Fetch feedbacks based on the subject name
    const feedbacks = await Feedback.find({ subjectName });

    console.log("Fetched Feedbacks:", feedbacks);

    // Check if feedbacks are found
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found for the given subject" });
    }

    // Initialize variables for analysis
    const facultyAnalysis = {};

    // Process each feedback
    feedbacks.forEach(feedback => {
      const { facultyName, branch, responses } = feedback;
      if (!responses) return;

      console.log("Processing Feedback:", feedback);

      // Convert responses from Map to an object
      const responsesObj = Object.fromEntries(responses);

      // Get all scores
      const scores = Object.values(responsesObj).map(score => parseFloat(score));
      const validScores = scores.filter(score => !isNaN(score));
      const totalScore = validScores.reduce((acc, score) => acc + score, 0);
      const count = validScores.length;

      console.log("Scores:", scores);
      console.log("Valid Scores:", validScores);

      if (count === 0) return;

      const averageScore = totalScore / count;

      if (!facultyAnalysis[facultyName]) {
        facultyAnalysis[facultyName] = {
          branchAnalysis: {},
          totalScore: 0,
          count: 0
        };
      }

      if (!facultyAnalysis[facultyName].branchAnalysis[branch]) {
        facultyAnalysis[facultyName].branchAnalysis[branch] = {
          totalScore: 0,
          count: 0
        };
      }

      facultyAnalysis[facultyName].branchAnalysis[branch].totalScore += averageScore;
      facultyAnalysis[facultyName].branchAnalysis[branch].count += 1;
      facultyAnalysis[facultyName].totalScore += averageScore;
      facultyAnalysis[facultyName].count += 1;
    });

    console.log("Faculty Analysis:", facultyAnalysis);

    // Calculate average score and percentage per faculty per branch
    const result = Object.keys(facultyAnalysis).map(facultyName => {
      const branchAnalysis = facultyAnalysis[facultyName].branchAnalysis;
      const branches = Object.keys(branchAnalysis);

      return branches.map(branch => {
        const branchData = branchAnalysis[branch];
        const averageScore = branchData.count > 0 ? (branchData.totalScore / branchData.count).toFixed(2) : '0.00';
        const averagePercentage = ((branchData.totalScore / (branchData.count * maxScore)) * 100).toFixed(2);
        return {
          facultyName,
          branch,
          averageRating: averageScore,
          averagePercentage: averagePercentage
        };
      });
    }).flat();

    // Respond with analysis data
    res.json(result);
    console.log("Feedback analysis result:", result);
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    res.status(500).json({ message: "Error analyzing feedback", error });
  }
};
