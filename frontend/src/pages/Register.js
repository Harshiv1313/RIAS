import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FacultyImage from '../assets/faculty.png';
import StudentImage from '../assets/student.png';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    registrationNumber: '',
    semester: '',
    branch: '',
    section: '',
    rollNumber: '',
    password: '',
    role: '',
    batch: '' // Added state for batch dropdown
  });
  const navigate = useNavigate();

  const {
    username, email, mobileNumber, registrationNumber,
    semester, branch, section, rollNumber, password, role, batch
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBatchChange = (e) => {
    setFormData({ ...formData, batch: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/register', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  const selectRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  return (
    <div className="register-container">
      <div className="register-card-container">
        <div className="register-column register-role-column">
          <div className="register-role-card">
            <img
              src={FacultyImage}
              alt="Faculty Role"
              className={`register-role-button ${role === 'faculty' ? 'register-selected-role-button' : ''}`}
              onClick={() => selectRole('faculty')}
            />
            <img
              src={StudentImage}
              alt="Student Role"
              className={`register-role-button ${role === 'student' ? 'register-selected-role-button' : ''}`}
              onClick={() => selectRole('student')}
            />
          </div>
        </div>

        <div className="register-column register-form-column">
          <div className="register-register-card">
            <div className="register-title"><b>Register Page</b></div>
            <div className="register-form-wrapper">
              <form onSubmit={onSubmit}>
                <label htmlFor="email" className="register-label">Email</label>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" className="register-input" />

                <label htmlFor="username" className="register-label">Username</label>
                <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" className="register-input" />

                <label htmlFor="mobileNumber" className="register-label">Mobile Number</label>
                <input type="text" name="mobileNumber" value={mobileNumber} onChange={onChange} placeholder="Mobile Number" className="register-input" />

                <label htmlFor="registrationNumber" className="register-label">Registration Number</label>
                <input type="text" name="registrationNumber" value={registrationNumber} onChange={onChange} placeholder="Registration Number" className="register-input" />

                <label htmlFor="semester" className="register-label">Semester</label>
                <select name="semester" value={semester} onChange={onChange} className="register-input">
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>

                <label htmlFor="branch" className="register-label">Branch</label>
                <select name="branch" value={branch} onChange={onChange} className="register-input">
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IOT">IOT</option>
                  <option value="AIML">AIML</option>
                  <option value="AI">AI</option>
                  <option value="DATA SCIENCE">DATA SCIENCE</option>
                  <option value="MECHANICAL">MECHANICAL</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="ELECTRICAL">ELECTRICAL</option>
                  <option value="ETRX">ETRX</option>
                </select>

                <label htmlFor="section" className="register-label">Section</label>
                <select name="section" value={section} onChange={onChange} className="register-input">
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>

                <label htmlFor="batch" className="register-label">Batch</label>
                <select name="batch" value={batch} onChange={handleBatchChange} className="register-input">
                  <option value="">Select Batch</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <label htmlFor="rollNumber" className="register-label">Roll Number</label>
                <input type="text" name="rollNumber" value={rollNumber} onChange={onChange} placeholder="Roll Number" className="register-input" />

                <label htmlFor="password" className="register-label">Password</label>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="register-input" />

                <label htmlFor="role" className="register-label">Role</label>
                <input type="text" name="role" value={role} readOnly className="register-input" />

                <div className='regbutton'>
                  <button type="submit" className="register-button">Register</button>
                </div>
              </form>
            </div>
            <div className='regbutton'>
              <button type="button" onClick={() => navigate('/login')} className="register-login-button">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
