import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import UpperNavbar from '../UpperNavbar';
import StudentMainContentPart1 from './StudentMainContentPart1'; // Ensure correct path
import StudentMainContentPart2 from './StudentMainContentPart2'; // Ensure correct path
import './CSS/StudentDashboard.css'; // Ensure correct path

const StudentDashboard = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="dashboard-container">
      <UpperNavbar isClosed={isSidebarClosed} />
      <div className={`main-layout ${isSidebarClosed ? 'expanded' : 'collapsed'}`}>
        <Sidebar isClosed={isSidebarClosed} onToggleSidebar={handleToggleSidebar} />
        <div className="main-content">
          <div className="content">
            <div className="student-main-content-part1">
              <StudentMainContentPart1 />
            </div>
            <div className="student-main-content-part2">
              <StudentMainContentPart2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
