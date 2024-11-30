// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <img src="/project-logo.png" alt="Project Logo" />
      </div>
      <div className="project-name">
        <h1>Prepaid Smart Energy Meter</h1>
      </div>
      <nav className="nav-links">
        <NavLink exact to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Introduction
        </NavLink>
        <NavLink to="/loadcontrol" className={({ isActive }) => isActive ? "active-link" : ""}>
          Load Control
        </NavLink>
        <NavLink to="/realtimedata" className={({ isActive }) => isActive ? "active-link" : ""}>
          Real Time Data
        </NavLink>
        <NavLink to="/recharge" className={({ isActive }) => isActive ? "active-link" : ""}>
          Recharge
        </NavLink>
        <NavLink to="/paymenthistory" className={({ isActive }) => isActive ? "active-link" : ""}>
          Payment History
        </NavLink>
        <NavLink to="/conclusion" className={({ isActive }) => isActive ? "active-link" : ""}>
          Conclusion
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
