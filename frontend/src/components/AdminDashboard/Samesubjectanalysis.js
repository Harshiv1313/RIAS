import React, { useState } from "react";
import axios from "axios";
import styles from "./css/FacultyFeedback.module.css"; // Adjust the path as needed

const Samesubjectanalysis = () => {
  const [subjectName, setSubjectName] = useState("");
  const [analysisData, setAnalysisData] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchAnalysis = async () => {
    try {
      if (!subjectName) {
        setMessage("Please enter a subject name.");
        setMessageType("error");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/admin/by-same-subject", {
        params: { subjectName },
      });

      if (response.data && response.data.length > 0) {
        setAnalysisData(response.data);
        setMessage("");
      } else {
        setAnalysisData([]);
        setMessage("No analysis data available for the entered subject.");
        setMessageType("info");
      }
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setMessage("Failed to load analysis data.");
      setMessageType("error");
    }
  };

  const handleSubjectChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handleSearch = () => {
    fetchAnalysis();
  };

  return (
    <div style={{ marginTop: '70px', marginLeft: '70px' }} className={styles.container}>
      <div className={styles.feedbackCard}>
        <h2>Same Subject Feedback Analysis</h2>
        <p>Enter a subject name to analyze feedback.</p>
        {message && (
          <div className={`${styles.message} ${styles[messageType]}`}>
            {message}
          </div>
        )}
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={subjectName}
            onChange={handleSubjectChange}
            placeholder="Enter Subject Name"
            className={styles.subjectInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
        {analysisData.length > 0 ? (
          <div className={styles.analysisTableWrapper}>
            <table className={styles.analysisTable}>
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Branch</th>
                  <th>Average Rating</th>
                  <th>Average Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.facultyName}</td>
                    <td>{data.branch}</td>
                    <td>{data.averageRating !== '0.00' ? data.averageRating : "No Ratings"}</td>
                    <td>{data.averagePercentage !== '0.00' ? `${data.averagePercentage}%` : "No Ratings"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          messageType !== "error" && <p>No analysis data available for the entered subject.</p>
        )}
      </div>
    </div>
  );
};

export default Samesubjectanalysis;
