import React, { useState, useEffect } from "react";
import "./CSS/TheoryFeedback.css";

const theoryQuestions = [
  'Theoretical sessions were well-organized and conducted in a structured manner',
  'The content presented in theoretical sessions was relevant and up-to-date',
  'Theoretical sessions included practical examples and applications',
  'The instructor provided clear explanations and engaged the students effectively',
  'The pace of the theoretical sessions was appropriate for understanding the material',
  'Feedback on theoretical sessions was provided in a timely and constructive manner',
  'Theoretical sessions encouraged critical thinking and active participation',
  'The evaluation criteria for theoretical work were clear and fair',
  'Adequate time was given for discussions and Q&A during theoretical sessions',
  'Theoretical sessions were integrated well with practical exercises and assignments'
];

const TheoryFeedbackForm = () => {
  const [profileData, setProfileData] = useState(null);
  const [theoryTimetableData, setTheoryTimetableData] = useState([]);
  const [filteredTheoryTimetable, setFilteredTheoryTimetable] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        const theoryData = data.filter(item => item.type === "Theory");
        setTheoryTimetableData(theoryData);
      } else {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching timetable data:", error);
      setError("Error fetching timetable data. Please try again later.");
    }
  };

  useEffect(() => {
    if (profileData) {
      const filterData = (timetable) => {
        return timetable.filter(
          (item) =>
            item.branch === profileData.branch &&
            item.section === profileData.section &&
            item.semester === profileData.semester
        );
      };

      setFilteredTheoryTimetable(filterData(theoryTimetableData));
    }
  }, [profileData, theoryTimetableData]);

  useEffect(() => {
    fetchProfileData();
    fetchTimetableData();
  }, []);

  const handleChange = (event, questionIndex, timetableIndex) => {
    const { value } = event.target;
    setResponses(prevResponses => ({
      ...prevResponses,
      [`theory_${timetableIndex}_${questionIndex}`]: parseInt(value, 10) || 0
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const studentId = decodedToken.id;

      const feedbackEntries = filteredTheoryTimetable.map((item, timetableIndex) => ({
        facultyName: item.facultyName,
        courseName: item.subjectName,
        responses: theoryQuestions.reduce((acc, question, questionIndex) => ({
          ...acc,
          [`${timetableIndex}_${questionIndex}`]: responses[`theory_${timetableIndex}_${questionIndex}`] || 0
        }), {})
      }));

      const response = await fetch('http://localhost:4000/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId,
          feedbackEntries
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('Feedback submitted successfully!');
        setError('');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error submitting feedback. Please try again.');
      setSuccess('');
    }
  };

  const styles = {
    th: { padding: '10px', border: '1px solid #ddd' },
    td: { padding: '10px', border: '1px solid #ddd' },
    select: { width: '100px' }
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
                {filteredTheoryTimetable.map((item, index) => (
                  <tr key={item._id}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{item.subjectName}</td>
                    <td style={styles.td}>{item.facultyName}</td>
                    <td style={styles.td}>{item.courseCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>Feedback Form</h4>
            <form onSubmit={handleSubmit}>
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th style={styles.th}>S.N.</th>
                    <th style={styles.th}>Theory Factors</th>
                    {filteredTheoryTimetable.map((item, index) => (
                      <th key={item.serial} style={styles.th}>{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {theoryQuestions.map((question, questionIndex) => (
                    <tr key={questionIndex}>
                      <td style={styles.td}>{questionIndex + 1}</td>
                      <td style={styles.td}>{question}</td>
                      {filteredTheoryTimetable.map((item, timetableIndex) => (
                        <td key={`theory_${timetableIndex}_${questionIndex}`} style={styles.td}>
                          <select
                            value={responses[`theory_${timetableIndex}_${questionIndex}`] || ''}
                            onChange={(event) => handleChange(event, questionIndex, timetableIndex)}
                            style={styles.select}
                          >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit">Submit Feedback</button>
              {success && <p className="success-message">{success}</p>}
            </form>
          </>
        ) : (
          <p>No timetable data available for the current profile.</p>
        )}
      </div>
    </div>
  );
};

export default TheoryFeedbackForm;
