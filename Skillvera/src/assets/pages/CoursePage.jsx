import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState("");
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      if (res.ok) {
        setCourses(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      setError("Title and description are required.");
      return;
    }
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewTitle("");
        setNewDescription("");
        fetchCourses(); // refresh list
      } else {
        setError(data.message || "Failed to create course");
      }
    } catch (err) {
      setError("Error creating course");
    }
  };

  const navigate = useNavigate();
  const enrollInCourse = async (courseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert("Enrolled successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to enroll");
      }
    } catch (err) {
      alert("Error enrolling in course");
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      
      {(role === "admin" || role === "teacher") && (
        <div style={{ marginBottom: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
          <h3>Create New Course</h3>
          <form onSubmit={createCourse} style={{ maxWidth: 420 }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form-row">
              <label>Course Title</label>
              <input
                className="input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Course Description</label>
              <textarea
                className="input"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Create Course
            </button>
          </form>
        </div>
      )}

      <div>
        {courses.length === 0 ? (
          <p>No courses available right now.</p>
        ) : (
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {courses.map((c) => (
              <div key={c._id} style={{ border: "1px solid #eaeaea", padding: 16, borderRadius: 8 }}>
                <h4>{c.title}</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>{c.description}</p>
                <p style={{ fontSize: "0.85rem", marginTop: 8 }}>
                  Teacher: <strong>{c.teacherId?.teachername || "Unknown"}</strong>
                </p>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <button className="btn" onClick={() => navigate(`/courses/${c._id}`)}>View Details</button>
                  {role === "student" && (
                     <button className="btn btn-primary" onClick={() => enrollInCourse(c._id)}>Enroll</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
