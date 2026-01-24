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
