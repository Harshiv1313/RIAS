import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./css/BranchAnalysis.module.css"; // Adjust the path as needed

const BranchAnalysis = () => {
  const [branch, setBranch] = useState(sessionStorage.getItem("branch") || "");
  const [analysisData, setAnalysisData] = useState(JSON.parse(sessionStorage.getItem("analysisData")) || []);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch branches if not already cached
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/feedback/feedbacks/branches");
        setBranches(response.data);
        sessionStorage.setItem("branches", JSON.stringify(response.data)); // Cache branches data
      } catch (error) {
        console.error("Error fetching branches:", error);
        setMessage("Failed to load branches.");
        setMessageType("error");
      }
    };

    const cachedBranches = sessionStorage.getItem("branches");
    if (cachedBranches) {
      setBranches(JSON.parse(cachedBranches));
    } else {
      fetchBranches();
    }
  }, []);

  useEffect(() => {
    // Store branch and analysisData in cache
    sessionStorage.setItem("branch", branch);
    sessionStorage.setItem("analysisData", JSON.stringify(analysisData));
  }, [branch, analysisData]);

  const fetchAnalysis = async () => {
    try {
      if (!branch) {
        setMessage("Please select a branch.");
        setMessageType("error");
        return;
      }

      const response = await axios.get("http://localhost:4000/api/admin/feedback-analysis-by-branch", {
        params: { branch },
      });

      if (response.data && response.data.facultyData.length > 0) {
        setAnalysisData(response.data.facultyData);
        setMessage("");
      } else {
        setAnalysisData([]);
        setMessage("No analysis data available for the selected branch.");
        setMessageType("info");
      }
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setMessage("Failed to load analysis data.");
      setMessageType("error");
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSearch = () => {
    fetchAnalysis();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("branch");
    sessionStorage.removeItem("analysisData");
    sessionStorage.removeItem("branches");
    // Implement your logout logic here
  };

  const getFeedbackRemark = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Very Good";
    if (percentage >= 70) return "Good";
    if (percentage >= 60) return "Satisfactory";
    
    return "Need Improvement";
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('analysisTable');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("Branch_Analysis_Report.pdf");
      });
  };

  return (
    <div className={styles.BranchAnalysis_container}>
      <div className={styles.BranchAnalysis_card}>
        <h2>Branch Feedback Analysis</h2>
        <p>Select a branch to analyze feedback across faculty members.</p>
        {message && (
          <div className={`${styles.BranchAnalysis_message} ${styles[messageType]}`}>
            {message}
          </div>
        )}
        <div className={styles.BranchAnalysis_inputcontainer}>
          <select
            value={branch}
            onChange={handleBranchChange}
            className={styles.BranchAnalysis_branchDropdown}
          >
            <option value="">Select Branch</option>
            {branches.map((br, index) => (
              <option key={index} value={br}>
                {br}
              </option>
            ))}
          </select>
          <button onClick={handleSearch} className={styles.BranchAnalysis_searchButton}>
            Search
          </button>
          <button onClick={handleDownloadPDF} className={styles.BranchAnalysis_pdfButton}>
            Download PDF
          </button>
        </div>
        {analysisData.length > 0 ? (
          <div className={styles.BranchAnalysis_analysisTableWrapper}>
            <table id="analysisTable" className={styles.BranchAnalysis_analysisTable}>
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Course Count</th>
                  <th>Student Count</th>
                  <th>Average Rating</th>
                  <th>Average Percentage</th>
                  <th>Feedback Remark</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.facultyName}</td>
                    <td>{data.courseCount}</td>
                    <td>{data.studentCount}</td>
                    <td>{data.averageRating !== '0.00' ? data.averageRating : "0"}</td>
                    <td>{data.averagePercentage !== '0.00' ? data.averagePercentage : "0%"}</td>
                    <td>{getFeedbackRemark(data.averagePercentage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          messageType !== "error" && <p>No analysis data available for the selected branch.</p>
        )}
      </div>
    </div>
  );
};

export default BranchAnalysis;
