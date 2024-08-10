import React, { useState, useEffect } from "react";
import "./CSS/Stufeedback.css"; // Ensure CSS is correctly imported

const questions = [
  'Lecture preparation, organization and course material (structure)',
  'Board writing, organization and use of audio-visual aids used',
  'Lecture delivered with emphasis on fundamental concepts and with illustrative examples and faculty has command over the subject',
  'Difficult topics were taught with adequate attention and ease',
  'The teacher is enthusiastic about teaching and able to deliver lecture with good communication skills',
  'Encouraged to ask questions to make lecture interactive and lively',
  'The TAE Parameters and tests were challenging (with new and novel problem-solving approach)',
  'TAE & CAE marks were displayed regularly',
  'CAE question paper was discussed in the class after exam and answer sheets were shown',
  'The evaluations were fair and impartial and it helps to improve students'
];

const practicalQuestions = [
  'Experiment preparation, organization, and execution',
  'Clarity of instructions provided during the practical session',
  'Availability and effectiveness of practical resources and equipment',
  'Faculty’s guidance and support during the practical session',
  'Relevance of the practical session to theoretical concepts taught',
  'Timeliness of feedback provided on practical work',
  'Faculty’s ability to handle practical problems and queries',
  'Fairness in evaluating practical work',
  'Practical session was conducted in an interactive and engaging manner',
  'Suggestions for improving practical sessions'
];

const FeedbackForm = () => {
  const [profileData, setProfileData] = useState(null);
  const [theoryTimetableData, setTheoryTimetableData] = useState([]);
  const [practicalTimetableData, setPracticalTimetableData] = useState([]);
  const [filteredTheoryTimetable, setFilteredTheoryTimetable] = useState([]);
  const [filteredPracticalTimetable, setFilteredPracticalTimetable] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch student profile data
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await fetch(
        `http://localhost:4000/api/users/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Error fetching profile data. Please try again later.");
    }
  };

  // Fetch timetable data
  const fetchTimetableData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:4000/api/timetables", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Filter for only 'Theory' type entries
        const theoryData = data.filter(item => item.type === "Theory");
        setTheoryTimetableData(theoryData);
        
        // Filter for only 'Practical' type entries
        const practicalData = data.filter(item => item.type === "Practical");
        setPracticalTimetableData(practicalData);
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching timetable data:", error);
      setError("Error fetching timetable data. Please try again later.");
    }
  };

  // Filter timetable data based on profile data
  useEffect(() => {
    if (profileData && theoryTimetableData.length > 0) {
      const filteredTheory = theoryTimetableData.filter(
        (entry) =>
          entry.branch === profileData.branch &&
          entry.section === profileData.section &&
          entry.semester === profileData.semester
      );
      
      // Assign serial numbers to timetable entries
      const withSerialNumbersTheory = filteredTheory.map((item, index) => ({
        ...item,
        serial: index + 1
      }));

      setFilteredTheoryTimetable(withSerialNumbersTheory);

      // Initialize responses state for each timetable entry and question
      const initialResponses = {};
      withSerialNumbersTheory.forEach((entry) => {
        questions.forEach((question) => {
          const key = `${entry.serial}_${question}`;
          initialResponses[key] = 0;
        });
      });
      setResponses(initialResponses);
    }
    if (profileData && practicalTimetableData.length > 0) {
      const filteredPractical = practicalTimetableData.filter(
        (entry) =>
          entry.branch === profileData.branch &&
          entry.section === profileData.section &&
          entry.semester === profileData.semester
      );
      
      // Assign serial numbers to timetable entries
      const withSerialNumbersPractical = filteredPractical.map((item, index) => ({
        ...item,
        serial: index + 1
      }));

      setFilteredPracticalTimetable(withSerialNumbersPractical);
    }
  }, [profileData, theoryTimetableData, practicalTimetableData]);

  useEffect(() => {
    fetchProfileData();
    fetchTimetableData();
  }, []);

  const handleChange = (event, serial, question) => {
    const { name, value } = event.target;
    const key = `${serial}_${question}`;
    setResponses((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:4000/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId: JSON.parse(atob(token.split('.')[1])).id,
          responses
        })
      });

      if (response.ok) {
        setSuccess('Feedback submitted successfully!');
        setError('');
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
      setSuccess('');
    }
  };

  const styles = {
    th: { border: '1px solid #ddd', padding: '8px' },
    td: { border: '1px solid #ddd', padding: '8px' },
    select: { width: '100%' }
  };

  return (
    <div className="feedback-card">
      <div className="feedback-content">
        <h3>Profile & Timetable</h3>
        {error && <p className="error-message">{error}</p>}
        {profileData && (
          <div className="profile-info">
            <p><strong>Student Name:</strong> {profileData.username}</p>
            <p><strong>Branch:</strong> {profileData.branch}</p>
            <p><strong>Section:</strong> {profileData.section}</p>
            <p><strong>Semester:</strong> {profileData.semester}</p>
          </div>
        )}
        {filteredTheoryTimetable.length > 0 ? (
          <>
            <h4>Theory Timetable</h4>
            <table className="timetable-table">
              <thead>
                <tr>
                  <th style={styles.th}>S.N.</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Faculty</th>
                  <th style={styles.th}>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredTheoryTimetable.map((item) => (
                  <tr key={item.serial}>
                    <td style={styles.td}>{item.serial}</td>
                    <td style={styles.td}>{item.subjectName}</td>
                    <td style={styles.td}>{item.facultyName}</td>
                    <td style={styles.td}>{item.courseCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="no-timetable-message">
            No theory timetable available for your branch, section, and semester.
          </div>
        )}
      </div>
      <div className="feedback-form-container">
        <h2>Feedback Form</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <table className="feedback-table">
            <thead>
              <tr>
                <th style={styles.th}>S.N.</th>
                <th style={styles.th}>Theory Factors</th>
                {filteredTheoryTimetable.map(item => (
                  <th key={item.serial} style={styles.th}>{item.serial}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{question}</td>
                  {filteredTheoryTimetable.map(item => (
                    <td key={item.serial} style={styles.td}>
                      <select
                        name={`${item.serial}_${question}`}
                        value={responses[`${item.serial}_${question}`] || 0}
                        onChange={(e) => handleChange(e, item.serial, question)}
                        style={styles.select}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="submit-button">Submit Feedback</button>
        </form>
      </div>
      <div className="feedback-timetable-section">
        {filteredPracticalTimetable.length > 0 ? (
          <>
            <h4>Practical Timetable</h4>
            <table className="timetable-table">
              <thead>
                <tr>
                  <th style={styles.th}>S.N.</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Faculty</th>
                  <th style={styles.th}>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {filteredPracticalTimetable.map((item) => (
                  <tr key={item.serial}>
                    <td style={styles.td}>{item.serial}</td>
                    <td style={styles.td}>{item.subjectName}</td>
                    <td style={styles.td}>{item.facultyName}</td>
                    <td style={styles.td}>{item.courseCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="no-timetable-message">
            No practical timetable available for your branch, section, and semester.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
