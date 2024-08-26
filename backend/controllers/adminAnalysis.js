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

          if (score >= 3) {  // Adjust the threshold based on 0 to 4 scale
            goodFeedbacks++;
          } else if (score <= 1) {  // Adjust the threshold based on 0 to 4 scale
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

    // Calculate average score as percentage
    const averageScore = count > 0 ? ((totalScores / (count * maxScore)) * 100).toFixed(2) : '0.00';

    // Calculate question averages as percentage
    const questionAverages = Object.keys(questionScores).reduce((acc, key) => {
      acc[key] = ((questionScores[key] / (questionCounts[key] * maxScore)) * 100).toFixed(2) + '%';
      return acc;
    }, {});

    // Calculate percentages for good and bad feedbacks
    const goodFeedbacksPercentage = count > 0 ? ((goodFeedbacks / count) * 100).toFixed(2) + '%' : '0.00%';
    const badFeedbacksPercentage = count > 0 ? ((badFeedbacks / count) * 100).toFixed(2) + '%' : '0.00%';

    // Respond with analysis data
    res.json({
      averageScore: `${averageScore}%`,
      goodFeedbacks: goodFeedbacksPercentage,
      badFeedbacks: badFeedbacksPercentage,
      totalFeedbacks: count,
      questionAverages
    });
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    res.status(500).json({ message: "Error analyzing feedback", error });
  }
};







// Maximum score used for percentage calculation
const maxScore = 4;

exports.getFeedbackAnalysisBySubject = async (req, res) => {
  try {
    const { subjectName } = req.query;

    // Check for required parameter
    if (!subjectName) {
      return res.status(400).json({ message: "Subject Name is required" });
    }



    // Fetch feedbacks based on the subject name
    const feedbacks = await Feedback.find({ subjectName });



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



      // Convert responses from Map to an object
      const responsesObj = Object.fromEntries(responses);

      // Get all scores
      const scores = Object.values(responsesObj).map(score => parseFloat(score));
      const validScores = scores.filter(score => !isNaN(score));
      const totalScore = validScores.reduce((acc, score) => acc + score, 0);
      const count = validScores.length;

 

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
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    res.status(500).json({ message: "Error analyzing feedback", error });
  }
};





























exports.getFeedbackAnalysisByFaculty = async (req, res) => {
  try {
    const { facultyName } = req.query;

    // Check for required parameter
    if (!facultyName) {
      return res.status(400).json({ message: "Faculty Name is required" });
    }

    // Fetch feedbacks based on the faculty name
    const feedbacks = await Feedback.find({ facultyName });

    // Check if feedbacks are found
    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found for the given faculty" });
    }

    // Initialize variables for analysis
    const subjectAnalysis = {};

    // Process each feedback
    feedbacks.forEach(feedback => {
      const { subjectName, responses } = feedback;
      if (!responses) return;

      // Convert responses from Map to an object
      const responsesObj = Object.fromEntries(responses);

      // Get all scores
      const scores = Object.values(responsesObj).map(score => parseFloat(score));
      const validScores = scores.filter(score => !isNaN(score));
      const totalScore = validScores.reduce((acc, score) => acc + score, 0);
      const count = validScores.length;

      if (count === 0) return;

      const averageScore = totalScore / count;

      if (!subjectAnalysis[subjectName]) {
        subjectAnalysis[subjectName] = {
          totalScore: 0,
          count: 0
        };
      }

      subjectAnalysis[subjectName].totalScore += averageScore;
      subjectAnalysis[subjectName].count += 1;
    });

    // Calculate average score and percentage per subject
    const result = Object.keys(subjectAnalysis).map(subjectName => {
      const subjectData = subjectAnalysis[subjectName];
      const averageScore = subjectData.count > 0 ? (subjectData.totalScore / subjectData.count).toFixed(2) : '0.00';
      const averagePercentage = ((subjectData.totalScore / (subjectData.count * maxScore)) * 100).toFixed(2);
      return {
        facultyName,
        subjectName,
        averageRating: averageScore,
        averagePercentage: averagePercentage
      };
    });

    // Respond with analysis data
    res.json(result);
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    res.status(500).json({ message: "Error analyzing feedback", error });
  }
};

