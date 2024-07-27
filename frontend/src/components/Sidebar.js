import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '../assets/menu.svg';
import DashboardIcon from '../assets/grid.svg';
import TimetablesIcon from '../assets/Rias.svg';
import FeedbackIcon from '../assets/feedback.svg';
import ReportsIcon from '../assets/report.svg';
import SurveysIcon from '../assets/survey.svg';
import AntiRaggingIcon from '../assets/ragging.svg';
import RewardsIcon from '../assets/reward.svg';
import SettingsIcon from '../assets/settings.svg';
import LogoutIcon from '../assets/log-out.svg';
import '../css/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <header>
        <img
          className={`menu-toggle ${isOpen ? 'rotate' : ''}`}
          src={MenuIcon}
          alt="menu"
          onClick={() => setIsOpen(!isOpen)}
        />
        <h1 className={`sidebar-title ${isOpen ? '' : 'hideElement'}`}>RIAS</h1>
      </header>
      <div className="menu-links">
        <ul className="links-list">
          <li className="dashboard-link">
            <a href="#">
              <img className="icon" src={DashboardIcon} alt="dashboard" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Dashboard</span>
            </a>
          </li>
          <li className="timetables-link">
            <a href="#">
              <img className="icon" src={TimetablesIcon} alt="timetables" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Timetables</span>
            </a>
          </li>
          <li className="feedback-link">
            <a href="#">
              <img className="icon" src={FeedbackIcon} alt="feedback" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Feedback</span>
            </a>
          </li>
          <li className="reports-link">
            <a href="#">
              <img className="icon" src={ReportsIcon} alt="reports" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Reports</span>
            </a>
          </li>
          <li className="surveys-link">
            <a href="#">
              <img className="icon" src={SurveysIcon} alt="surveys" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Surveys</span>
            </a>
          </li>
          <li className="anti-ragging-link">
            <a href="#">
              <img className="icon" src={AntiRaggingIcon} alt="anti-ragging" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Anti-Ragging</span>
            </a>
          </li>
          <li className="rewards-link">
            <a href="#">
              <img className="icon" src={RewardsIcon} alt="rewards" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Rewards</span>
            </a>
          </li>
          <li className="settings-link">
            <a href="#">
              <img className="icon" src={SettingsIcon} alt="settings" />
              <span className={`${isOpen ? '' : 'hideElement'}`}>Settings</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="bottom-content">
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
