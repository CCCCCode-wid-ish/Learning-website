import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ title = "Role Management System" }) => {
  const { user, dispatch } = useContext(AuthContext) || { user: null, dispatch: () => {} };
  const navigate = useNavigate();

  const handleLogout = () => {
    if (dispatch) {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-title-link">
            <BookOpen size={24} color="var(--primary, #3b82f6)" />
            <span className="navbar-title">{title}</span>
          </Link>
        </div>
        
        <div className="navbar-right">
          {user ? (
            <>
              <div className="user-info">
                <span className="user-name">{user.name || user.email || 'User'}</span>
                <span className="user-separator">|</span>
                <span className="user-role">{user.role || 'Guest'}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/request" className="nav-link register-btn">Request Access</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
