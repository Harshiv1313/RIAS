import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import UpperNavbar from '../UpperNavbar';
import StudentMainContentPart1 from './StudentMainContentPart1';
import StudentMainContentPart2 from './StudentMainContentPart2';
import './CSS/StudentDashboard.css';

const StudentDashboard = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="dashboard-container">
      <UpperNavbar />
      <div className={`main-layout ${isSidebarClosed ? 'collapsed' : ''}`}>
        <Sidebar isClosed={isSidebarClosed} onToggleSidebar={handleToggleSidebar} />
        <div className="main-content">
          <div className="student-main-content-part1">
            <StudentMainContentPart1 />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
