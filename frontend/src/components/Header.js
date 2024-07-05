import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/mym_with_heading.jpeg'; // Make sure the path to the logo is correct
import '../styles/Header.css';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      {/* <img src={logo} alt="MYM Logo" className="mym-logo" /> */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
}
