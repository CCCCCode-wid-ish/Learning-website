import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'var(--primary)' : 'var(--text-secondary)';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <BookOpen color="var(--primary)" size={28} />
          <span>Skillvera</span>
        </Link>
        
        <div className="navbar-links">
          <Link 
            to="/" 
            className="nav-link" 
            style={{ color: isActive('/') }}
          >
            Home
          </Link>
          <Link 
            to="/login" 
            className="nav-link" 
            style={{ color: isActive('/login') }}
          >
            Login
          </Link>
          <Link 
            to="/request" 
            className="btn btn-primary"
          >
            Request Access
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


Functional Requirements

The Navbar must include:

1️⃣ Application Logo / Title

Example text:

Role Management System

Displayed on the left side.

2️⃣ Logged-in User Information

Show:

User Name
User Role

Example:

Aishwarya Amin | Admin

This should come from AuthContext.

3️⃣ Logout Button

When clicked:

Clear authentication token
Clear user data
Redirect user to /login
Navbar Layout
-------------------------------------------------------
| Logo / App Name      |  User Name | Role | Logout  |
-------------------------------------------------------
Required React Features

Developer must:

• Use React functional component
• Use AuthContext to get user data
• Use React Router for navigation
• Use useNavigate() for logout redirect

Props (optional)

Navbar can receive:

title

Example:

Dashboard
Admin Panel
Example Component Structure

Navbar.jsx should contain:

Import React
Import CSS
Import AuthContext
Import useNavigate

Create Navbar component

Get user and logout function from AuthContext

Return JSX:
    Navbar container
        Left section → App Title
        Right section →
            User Name
            User Role
            Logout Button

Export Navbar