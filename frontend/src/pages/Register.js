import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RIASLogo from '../assets/rias.png'; // Adjust the path according to your file structure
import FacultyImage from '../assets/faculty.png'; // Adjust the path according to your file structure
import StudentImage from '../assets/student.png'; // Adjust the path according to your file structure
import '../css/Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    reenterEmail: '',
    username: '',
    mobileNumber: '',
    registrationNumber: '',
    semester: '',
    branch: '',
    section: '',
    rollNumber: '',
    password: '',
    reenterPassword: '',
    role: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    email, reenterEmail, username, mobileNumber, registrationNumber,
    semester, branch, section, rollNumber, password, reenterPassword, role
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const regNumRegex = /^[0-9]{15}$/;
    const rollNumRegex = /^[0-9]{2}$/;
    const validSemesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const validBranches = [
      'B.Tech in Computer Engineering',
      'B.Tech in Artificial Intelligence',
      'B.Tech in Cyber Security',
      'B.Tech in Data Science',
      'B.Tech in Electronics Engineering',
      'B.Tech in Information Technology',
      'B.Tech in Electrical Engineering',
      'B.Tech in Mechanical Engineering'
    ];

    if (!email || !reenterEmail || !username || !mobileNumber || !registrationNumber ||
        !semester || !branch || !section || !rollNumber || !password || !reenterPassword || !role) {
      return 'All fields are required';
    }
    if (email !== reenterEmail) {
      return 'Emails do not match';
    }
    if (password !== reenterPassword) {
      return 'Passwords do not match';
    }
    if (!phoneRegex.test(mobileNumber)) {
      return 'Mobile number must be 10 digits';
    }
    if (!regNumRegex.test(registrationNumber)) {
      return 'Registration number must be 15 digits';
    }
    if (!validSemesters.includes(semester)) {
      return 'Semester must be between 1 and 8';
    }
    if (!validBranches.includes(branch)) {
      return 'Branch must be one of the specified options';
    }
    if (!rollNumRegex.test(rollNumber)) {
      return 'Roll number must be 2 digits';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);  // Check this line
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const selectRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const closeError = () => {
    setError('');
  };

  return (
    <div className="container">
      {error && (
        <div className="error-popup">
          <div className="error-content">
            <p><b>{error}</b></p>
            <button onClick={closeError}>Close</button>
          </div>
        </div>
      )}
      <div className="card-container">
        <div className="role-card">
          <img
            src={FacultyImage}
            alt="Faculty Role"
            className={`role-button ${role === 'faculty' ? 'selected-role-button' : ''}`}
            onClick={() => selectRole('faculty')}
          />
          <img
            src={StudentImage}
            alt="Student Role"
            className={`role-button ${role === 'student' ? 'selected-role-button' : ''}`}
            onClick={() => selectRole('student')}
          />
        </div>
        <div className="register-card">
          <img src={RIASLogo} alt="RIAS Logo" className="logo" />
          <div className="title"><b>Register Page</b></div>
          <form onSubmit={onSubmit}>
            <label htmlFor="email" className="label">Email</label>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" className="input" required />
            
            <label htmlFor="reenterEmail" className="label">Re-enter Email</label>
            <input type="email" name="reenterEmail" value={reenterEmail} onChange={onChange} placeholder="Re-enter Email" className="input" required />
            
            <label htmlFor="username" className="label">Username</label>
            <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" className="input" required />
            
            <label htmlFor="mobileNumber" className="label">Mobile Number</label>
            <input type="text" name="mobileNumber" value={mobileNumber} onChange={onChange} placeholder="Mobile Number" className="input" required />
            
            <label htmlFor="registrationNumber" className="label">Registration Number</label>
            <input type="text" name="registrationNumber" value={registrationNumber} onChange={onChange} placeholder="Registration Number" className="input" required />
            
            <label htmlFor="semester" className="label">Semester</label>
            <input type="text" name="semester" value={semester} onChange={onChange} placeholder="Semester" className="input" required />
            
            <label htmlFor="branch" className="label">Branch</label>
            <input type="text" name="branch" value={branch} onChange={onChange} placeholder="Branch" className="input" required />
            
            <label htmlFor="section" className="label">Section</label>
            <input type="text" name="section" value={section} onChange={onChange} placeholder="Section" className="input" required />
            
            <label htmlFor="rollNumber" className="label">Roll Number</label>
            <input type="text" name="rollNumber" value={rollNumber} onChange={onChange} placeholder="Roll Number" className="input" required />
            
            <label htmlFor="password" className="label">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" className="input" required />
            
            <label htmlFor="reenterPassword" className="label">Re-enter Password</label>
            <input type="password" name="reenterPassword" value={reenterPassword} onChange={onChange} placeholder="Re-enter Password" className="input" required />
            
            <button type="submit" className="button">Register</button>
            <button type="button" onClick={() => navigate('/login')} className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
