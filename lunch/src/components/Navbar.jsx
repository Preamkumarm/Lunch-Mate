import React from 'react';
import './Navbar.css';
import logo from '../assests/logo.jpg';
import { Link } from 'react-router-dom';


const Navbar = ({ openReportModal }) => {


  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-left" id="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" id="navbar-logo" />
      </div>
      <div className="navbar-center" id="navbar-center">
        <span className="navbar-title" id="navbar-title">LUNCH MATE</span>
      </div>
      <div className="navbar-right" id="navbar-right">
        <ul className="navbar-menu" id="navbar-menu">
          <li className="navbar-menu-item" id="home-menu-item"><Link to={"/home"}>HOME</Link></li>
          <li 
            className="navbar-menu-item" 
            id="reports-menu-item" 
            onClick={openReportModal} 
            style={{ cursor: 'pointer' }}
          >
            REPORTS
          </li>
          <li className="navbar-menu-item" id="admin-dashboard-menu-item">ADMIN DASHBOARD</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
