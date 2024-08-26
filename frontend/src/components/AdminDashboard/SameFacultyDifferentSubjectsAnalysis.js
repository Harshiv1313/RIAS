import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/SameFacultyDifferentSubjectsAnalysis.module.css"; // Adjust the path as needed

const SameFacultyDifferentSubjectsAnalysis = () => {
  const [facultyName, setFacultyName] = useState("");
  const [analysisData, setAnalysisData] = useState([]);
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
        {analysisData.length > 0 ? (
          <div className={styles.SameFacultyDifferentSubjectsAnalysi_analysisTableWrapper}>
            <table className={styles.SameFacultyDifferentSubjectsAnalysi_analysisTable}>
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Subject Name</th>
                  <th>Average Rating</th>
                  <th>Average Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.facultyName}</td>
                    <td>{data.subjectName}</td>
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
