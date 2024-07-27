import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UpperNavbar from './UpperNavbar';
import '../../css/App.css'; // Ensure you have a corresponding CSS file

const AppLayout = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="app-layout">
      <Sidebar isClosed={isSidebarClosed} onToggleSidebar={toggleSidebar} />
      <UpperNavbar isClosed={isSidebarClosed} />
      <div className={`content ${isSidebarClosed ? 'sidebar-closed' : ''}`}>
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default AppLayout;
