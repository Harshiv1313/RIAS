import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import UpperNavbar from '../UpperNavbar';
import FacultyMainContentPart1 from './FacultyMainContentPart1'; // You can add your content components
import './css/FacultyDashboard.css'; // Create and add styles for the faculty dashboard

const FacultyDashboard = () => {
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
          <div className="faculty-main-content-part1">
            <FacultyMainContentPart1 />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
