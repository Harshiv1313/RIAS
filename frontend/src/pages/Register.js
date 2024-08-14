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
    role: ''
  });
  const navigate = useNavigate();

  const {
    username, email, mobileNumber, registrationNumber,
    semester, branch, section, rollNumber, password, role
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
                <input type="text" name="semester" value={semester} onChange={onChange} placeholder="Semester" className="register-input" />

                <label htmlFor="branch" className="register-label">Branch</label>
                <input type="text" name="branch" value={branch} onChange={onChange} placeholder="Branch" className="register-input" />

                <label htmlFor="section" className="register-label">Section</label>
                <input type="text" name="section" value={section} onChange={onChange} placeholder="Section" className="register-input" />

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
