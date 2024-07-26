import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../assets/profile-icon.svg';
import LogoutIcon from '../assets/log-out.svg';
import SearchIcon from '../assets/search.svg';
import '../css/UpperNavbar.css';

const UpperNavbar = () => {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="upper-navbar">
      <div className="logo">
        <span className="navbar-title">RIAS</span>
      </div>
      <div className="search-bar">
        <div className="search-container">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input type="search" placeholder="Search" className={`search-input ${isClosed ? 'hideElement' : ''}`} />
        </div>
      </div>
      <div className="nav-buttons">
        <img src={ProfileIcon} alt="Profile" className="nav-icon" />
        <img src={LogoutIcon} alt="Logout" className="nav-icon" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default UpperNavbar;
