import React, { useState, useEffect } from 'react';
import '../FacultyDashboard/css/FacultySurvey.css'; // Import CSS

const FacultySurvey = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [message, setMessage] = useState('');

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const response = await fetch('http://localhost:4000/api/users/students', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle feedback form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch('http://localhost:4000/api/feedback/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          form: feedbackContent,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }
      const result = await response.json();
      setMessage('Feedback sent successfully');
      setFeedbackContent('');
      setSelectedStudent('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      setMessage('Failed to send feedback');
    }
  };

  return (
    <div className="faculty-survey-container">
      <h2>Send Feedback to Students</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="student">Select Student:</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback Content:</label>
          <textarea
            id="feedback"
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Feedback</button>
      </form>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default FacultySurvey;
