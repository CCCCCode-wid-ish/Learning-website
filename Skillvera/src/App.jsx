import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

// Standard Components
import Navbar from "./assets/components/Navbar/Navbar";
import Sidebar from "./assets/components/Sidebar/Sidebar";
import Footer from "./assets/components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import RequestAccess from "./pages/RequestAccess";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import StudentDashboard from "./assets/pages/StudentDashboard";
import CoursePage from "./assets/pages/CoursePage";
import CourseDetails from "./assets/pages/CourseDetails";
import QuizTake from "./assets/pages/QuizTake";

import { AuthContext } from "./assets/context/AuthContext";

export default function App() {
  const { role } = useContext(AuthContext);

  return (
    <div className="app-root">
      <Navbar />
      
      <div className="main">
        {/* Only show sidebar if the user is logged in (has a role) */}
        {role && <Sidebar />}
        
        <div className="content" style={{ padding: role ? "40px" : "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            
            {/* Super Admin Routes */}
            <Route path="/superadmin" element={<SuperAdminDashboard />} />
            <Route path="/manage-admins" element={<SuperAdminDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/requests" element={<AdminDashboard />} />

            {/* General Authed Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/quizzes/:quizId" element={<QuizTake />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
