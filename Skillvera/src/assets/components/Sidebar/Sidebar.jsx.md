import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const active = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 500,
    display: "block",
    padding: "8px 6px",
  });
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" style={active}>
          Home
        </NavLink>
        <NavLink to="/login" style={active}>
          Login
        </NavLink>
        <NavLink to="/admin" style={active}>
          Admin Dashboard
        </NavLink>
        <NavLink to="/student" style={active}>
          Student Dashboard
        </NavLink>
        <NavLink to="/courses" style={active}>
          Courses
        </NavLink>
      </nav>
    </aside>
  );
}



Purpose

Create a left-side navigation panel used in all dashboards to help users navigate between pages.

The sidebar menu should change dynamically based on the user role.

Functional Requirements
1️⃣ Display User Role

The sidebar should show the logged-in user role at the top.

Example:

Admin Panel
Super Admin Panel

This should come from AuthContext.

2️⃣ Navigation Menu

The sidebar should contain navigation links.

Super Admin Menu
Dashboard
Admin Requests
Manage Admins
Logout
Admin Menu
Dashboard
Student Requests
Teacher Requests
Logout
Navigation Behaviour

When clicking menu items:

Dashboard → dashboard page
Requests → show pending requests
Logout → clear token and redirect to login

Use React Router navigation.

Layout Structure
-------------------------
|  Role Panel           |
|-----------------------|
| Dashboard             |
| Admin Requests        |
| Manage Admins         |
| Logout                |
-------------------------

Sidebar should be displayed on the left side of the screen.

Technical Requirements

Developer should:

Use React functional component

Use useContext(AuthContext) for user role

Use React Router NavLink

Sidebar should be reusable for all dashboards

Component Structure

Sidebar.jsx should contain:

Import React
Import CSS
Import React Router
Import AuthContext

Create Sidebar component

Get user role from context

Render Sidebar container
    Sidebar header
    Menu list
        Dashboard
        Requests
        Logout

Export component