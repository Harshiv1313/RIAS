import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/menu.svg';
import SearchIcon from '../assets/search.svg';
import GridIcon from '../assets/grid.svg';
import PetIcon from '../assets/pet.svg';
import UserIcon from '../assets/user.svg';
import VetIcon from '../assets/vet.svg';
import SettingsIcon from '../assets/settings.svg';
import LogoutIcon from '../assets/log-out.svg';
import UserImage from '../assets/photo.jpg';
import '../css/Sidebar.css'; // Ensure you have a corresponding CSS file

const Sidebar = ({ isClosed, onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
      <header>
        <img
          className={`menu-toggle ${isClosed ? 'rotate' : ''}`}
          src={MenuIcon}
          alt="menu"
          onClick={onToggleSidebar}
        />
      </header>
      <div className="menu-links">
        <ul className="links-list">
          <li className="dashboard-link">
            <a href="#">
              <img className="icon" src={GridIcon} alt="dashboard" />
              <span className={`${isClosed ? 'hideElement' : ''}`}>Dashboard</span>
            </a>
          </li>
          <li className="pets-link">
            <a href="#">
              <img className="icon" src={PetIcon} alt="pets" />
              <span className={`${isClosed ? 'hideElement' : ''}`}>Pets</span>
            </a>
          </li>
          <li className="clients-link">
            <a href="#">
              <img className="icon" src={UserIcon} alt="clients" />
              <span className={`${isClosed ? 'hideElement' : ''}`}>Clients</span>
            </a>
          </li>
          <li className="vets-link">
            <a href="#">
              <img className="icon" src={VetIcon} alt="vets" />
              <span className={`${isClosed ? 'hideElement' : ''}`}>Vets</span>
            </a>
          </li>
          <li className="settings-link">
            <a href="#">
              <img className="icon" src={SettingsIcon} alt="settings" />
              <span className={`${isClosed ? 'hideElement' : ''}`}>Settings</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="bottom-content">
        <div className="user-image">
          <img src={UserImage} alt="user" />
        </div>
        <div className="user-data">
          <span className="user-name">John Doe</span>
          <span className="user-status">Veterinary</span>
        </div>
        <img
          className="logout"
          src={LogoutIcon}
          alt="logout"
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
