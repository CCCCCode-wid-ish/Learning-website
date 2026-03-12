import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const { user, dispatch } = useContext(AuthContext) || { user: null, dispatch: () => {} };
  const navigate = useNavigate();
  
  const role = user?.role?.toUpperCase() || '';

  const handleLogout = () => {
    if (dispatch) {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    navigate('/login');
  };

  const getRolePanelTitle = () => {
    if (role === 'SUPERADMIN') return 'Super Admin Panel';
    if (role === 'ADMIN') return 'Admin Panel';
    if (role === 'STUDENT') return 'Student Dashboard';
    if (role === 'TEACHER') return 'Teacher Dashboard';
    return 'Dashboard';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {getRolePanelTitle()}
      </div>
      <nav className="sidebar-menu">
        {role ? (
          <NavLink 
            to={`/${role.toLowerCase()}`} 
            className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}
            end
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}
          >
            Home
          </NavLink>
        )}
        
        {role === 'SUPERADMIN' && (
          <>
            <NavLink to="/superadmin/requests" className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}>
              Admin Requests
            </NavLink>
            <NavLink to="/superadmin/manage" className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}>
              Manage Admins
            </NavLink>
          </>
        )}
        
        {role === 'ADMIN' && (
          <>
            <NavLink to="/admin/students" className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}>
              Student Requests
            </NavLink>
            <NavLink to="/admin/teachers" className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}>
              Teacher Requests
            </NavLink>
          </>
        )}

        {(!role) && (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'sidebar-item active-link' : 'sidebar-item')}>
            Login
          </NavLink>
        )}

        {role && (
          <button onClick={handleLogout} className="sidebar-item logout">
            Logout
          </button>
        )}
      </nav>
    </aside>
  );
}
