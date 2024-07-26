import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UpperNavbar from './UpperNavbar';
import '../css/StudentDashboard.css';

const StudentDashboard = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="dashboard-container">
      <UpperNavbar />
      <div className="main-layout">
        <Sidebar isClosed={isSidebarClosed} onToggleSidebar={handleToggleSidebar} />
        <div className={`main-content ${isSidebarClosed ? 'expanded' : 'collapsed'}`}>
          <div className="content">
            <h1>Student Dashboard</h1>
            {/* Add your main dashboard content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
