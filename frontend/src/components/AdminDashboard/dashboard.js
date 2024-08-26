// ./components/AdminDashboard/dashboard.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Sidebar from './Sidebar'; // Import the Sidebar component
import './css/dasboard.css'; // Import your CSS file for styling

const Adashboard = () => {
  return (
    <div className="admin-dashboard-layout">
      <Sidebar /> {/* Add the Sidebar component */}
      <div className="admin-dashboard-container">
        {/* Dashboard title */}
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>
        
        {/* Cards container */}
        <div className="admin-dashboard-cards">
          

          <div className="admin-dashboard-card">
            <h2> Timetables</h2>
            <p>This is the Timetables card content.</p>
            <Link to="/admin-dashboard/Feedback">
              <button className="admin-dashboard-button">Go to Timetables</button>
            </Link>
          </div>

          <div className="admin-dashboard-card">
            <h2> Feedback</h2>
            <p>This is the Feedback card content.</p>
            <Link to="/admin-dashboard/Stats">
              <button className="admin-dashboard-button">Go to Feedback</button>
            </Link>
          </div>

          <div className="admin-dashboard-card">
            <h2> Reports</h2>
            <p>This is the Reports card content.</p>
            <Link to="/admin-dashboard/adminchart">
              <button className="admin-dashboard-button">Go to Reports</button>
            </Link>
          </div>

          <div className="admin-dashboard-card">
            <h2> Surveys</h2>
            <p>This is the Surveys card content.</p>
            <Link to="/student-dashboard/Surveystu">
              <button className="admin-dashboard-button">Go to Surveys</button>
            </Link>
          </div>

          <div className="admin-dashboard-card">
            <h2> Users</h2>
            <p>This is the Users card content.</p>
            <Link to="/admin-dashboard/adminuser">
              <button className="admin-dashboard-button">Go to Users</button>
            </Link>
          </div>

          <div className="admin-dashboard-card">
            <h2> Settings</h2>
            <p>This is the Settings card content.</p>
            <Link to="/admin-dashboard/samesubject">
              <button className="admin-dashboard-button">Go to Settings</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adashboard;
