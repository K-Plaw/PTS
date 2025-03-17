import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css'; // Import styles
import PTS_Logo from '../components/PTS_Logo2.png';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <div className="navbar-container">
        {user ? (
          <div className="navbar-links">
            <span>Welcome, {user?.username} ({user?.role})</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            {user?.role === 'Admin' && <Link to="/settings">Settings</Link>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : null}
<div className="navbar-logo-container">
          <img src={PTS_Logo} alt="PTS Logo" className="navbar-logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
