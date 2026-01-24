import React from "react";
import { Routes, Route, Link } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import CoursePage from "./pages/CoursePage.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/courses" element={<CoursePage />} />
          </Routes>
        </div>
      </div>
      <footer className="footer">
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/admin">Admin</Link> | <Link to="/student">Student</Link>
      </footer>
    </div>
  );
}
