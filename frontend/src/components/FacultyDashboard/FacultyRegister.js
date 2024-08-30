import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/FacultyRegister.module.css'; // Import the CSS Module

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    subjectName: '',
    courseCode: '',
    branch: '',
    section: '',
    semester: '',
    type: '',
    batch: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/facultyregister/create/faculty', formData);
      alert('Faculty registered successfully');
    } catch (error) {
      console.error(error);
      alert('Error registering faculty');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Register Faculty</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.partition}>
          <div className={styles.field}>
            <label className={styles.label}>Faculty Name:</label>
            <input
              type="text"
              name="facultyName"
              value={formData.facultyName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Subject Name:</label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Course Code:</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Branch:</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Section:</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.partition}>
          <div className={styles.field}>
            <label className={styles.label}>Semester:</label>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Select type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Batch:</label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submit}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default FacultyRegister;
