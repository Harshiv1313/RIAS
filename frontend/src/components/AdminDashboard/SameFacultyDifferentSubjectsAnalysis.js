import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/SameFacultyDifferentSubjectsAnalysis.module.css"; // Adjust the path as needed

const SameFacultyDifferentSubjectsAnalysis = () => {
  const [facultyName, setFacultyName] = useState(() => localStorage.getItem('facultyName') || "");
  const [analysisData, setAnalysisData] = useState(() => JSON.parse(localStorage.getItem('analysisData')) || []);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/feedback/feedbacks/faculty-names");
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setMessage("Failed to load faculties.");
        setMessageType("error");
      }
    };

    fetchFaculties();
  }, []);

  useEffect(() => {
    if (facultyName) {
      localStorage.setItem('facultyName', facultyName);
    }
  }, [facultyName]);

  useEffect(() => {
    if (analysisData.length > 0) {
      localStorage.setItem('analysisData', JSON.stringify(analysisData));
    }
  }, [analysisData]);

  const fetchAnalysis = async () => {
    try {
      if (!facultyName) {
        setMessage("Please select a faculty member.");
        setMessageType("error");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/admin/by-faculty", {
        params: { facultyName },
      });

      if (response.data && response.data.length > 0) {
        setAnalysisData(response.data);
        setMessage("");
      } else {
        setAnalysisData([]);
        setMessage("No analysis data available for the selected faculty.");
        setMessageType("info");
      }
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setMessage("Failed to load analysis data.");
      setMessageType("error");
    }
  };

  const handleFacultyChange = (e) => {
    setFacultyName(e.target.value);
  };

  const handleSearch = () => {
    fetchAnalysis();
  };

  // Function to calculate final theory average
  const calculateFinalTheoryAverage = () => {
    const theoryData = analysisData.filter(data => data.type === 'theory');
    if (theoryData.length === 0) return null;
    const totalTheoryPercentage = theoryData.reduce((sum, data) => sum + parseFloat(data.averagePercentage), 0);
    const averageTheoryPercentage = totalTheoryPercentage / theoryData.length;
    return averageTheoryPercentage.toFixed(2);
  };

  // Function to calculate final practical average
  const calculateFinalPracticalAverage = () => {
    const practicalData = analysisData.filter(data => data.type === 'practical');
    if (practicalData.length === 0) return null;
    const totalPracticalPercentage = practicalData.reduce((sum, data) => sum + parseFloat(data.averagePercentage), 0);
    const averagePracticalPercentage = totalPracticalPercentage / practicalData.length;
    return averagePracticalPercentage.toFixed(2);
  };

  // Function to calculate final average percentage
  const calculateFinalAveragePercentage = () => {
    if (analysisData.length === 0) return null;
    const totalPercentage = analysisData.reduce((sum, data) => sum + parseFloat(data.averagePercentage), 0);
    const averagePercentage = totalPercentage / analysisData.length;
    return averagePercentage.toFixed(2);
  };

  const finalAveragePercentage = calculateFinalAveragePercentage();
  const finalTheoryAverage = calculateFinalTheoryAverage();
  const finalPracticalAverage = calculateFinalPracticalAverage();

  return (
    <div className={styles.SameFacultyDifferentSubjectsAnalysi_container}>
      <div className={styles.SameFacultyDifferentSubjectsAnalysi_card}>
        <h2>Same Faculty, Different Subjects Feedback Analysis</h2>
        <p>Select a faculty member to analyze feedback across subjects.</p>
        {message && (
          <div className={`${styles.SameFacultyDifferentSubjectsAnalysi_message} ${styles[messageType]}`}>
            {message}
          </div>
        )}
        <div className={styles.SameFacultyDifferentSubjectsAnalysi_inputcontainer}>
          <select
            value={facultyName}
            onChange={handleFacultyChange}
            className={styles.SameFacultyDifferentSubjectsAnalysi_subjectDropdown}
          >
            <option value="">Select Faculty</option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
          <button onClick={handleSearch} className={styles.SameFacultyDifferentSubjectsAnalysi_searchButton}>
            Search
          </button>
        </div>
        <div className={styles.SameFacultyDifferentSubjectsAnalysi_averages}>
          <div className={styles.SameFacultyDifferentSubjectsAnalysi_averageItem}>
            <p>Final Average: {finalAveragePercentage || "N/A"}</p>
          </div>
          <div className={styles.SameFacultyDifferentSubjectsAnalysi_averageItem}>
            <p>Theory Average: {finalTheoryAverage || "N/A"}</p>
          </div>
          <div className={styles.SameFacultyDifferentSubjectsAnalysi_averageItem}>
            <p>Practical Average: {finalPracticalAverage || "N/A"}</p>
          </div>
        </div>
        {analysisData.length > 0 ? (
          <div className={styles.SameFacultyDifferentSubjectsAnalysi_analysisTableWrapper}>
            <table className={styles.SameFacultyDifferentSubjectsAnalysi_analysisTable}>
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Subject Name</th>
                  <th>Branch</th>
                  <th>Type</th>
                  <th>Average Rating</th>
                  <th>Average Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.facultyName}</td>
                    <td>{data.subjectName}</td>
                    <td>{data.branch}</td>
                    <td>{data.type}</td>
                    <td>{data.averageRating !== '0.00' ? data.averageRating : "0"}</td>
                    <td>{data.averagePercentage !== '0.00' ? `${data.averagePercentage}%` : "0"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          messageType !== "error" && <p>No analysis data available for the selected faculty.</p>
        )}
      </div>
    </div>
  );
};

export default SameFacultyDifferentSubjectsAnalysis;
