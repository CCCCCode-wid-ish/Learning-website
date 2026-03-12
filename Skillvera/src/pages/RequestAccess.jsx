import React, { useState } from "react";

export default function RequestAccess() {
  const [role, setRole] = useState(null); // 'teacher' or 'student'
  const [formData, setFormData] = useState({
    name: "", email: "", institution: "", department: "", experience: "", college: "", course: "", year: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, role };
      const res = await fetch("http://localhost:5000/api/users/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatus("Request submitted successfully. Waiting for Admin approval.");
        setFormData({ name: "", email: "", institution: "", department: "", experience: "", college: "", course: "", year: "" });
        setRole(null);
      } else {
        const error = await res.json();
        setStatus("Failed to submit: " + (error.message || "Unknown error"));
      }
    } catch (err) {
      setStatus("Error connecting to server.");
    }
  };

  if (!role) {
    return (
      <div style={{ padding: "60px 40px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h2>Join Skillvera</h2>
        <p style={{ color: "#666", marginBottom: "40px" }}>Access must be vetted by administrators. Choose your requested persona below.</p>
        
        <div style={{ display: "flex", gap: "24px", justifyContent: "center" }}>
          <button className="glass-panel" onClick={() => setRole("teacher")} style={{ cursor: "pointer", transition: "transform 0.2s" }}>
            <h3 style={{ color: "#4f46e5", marginBottom: "16px" }}>Request Access as Teacher</h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>For educators seeking to create and manage courses.</p>
          </button>
          
          <button className="glass-panel" onClick={() => setRole("student")} style={{ cursor: "pointer", transition: "transform 0.2s" }}>
            <h3 style={{ color: "#ec4899", marginBottom: "16px" }}>Request Access as Student</h3>
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>For learners seeking to enroll and track progress.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <button className="btn" onClick={() => setRole(null)} style={{ marginBottom: "24px" }}>← Back</button>
      <h2>{role === "teacher" ? "Teacher Application" : "Student Application"}</h2>
      <p style={{ color: "#666", marginBottom: "32px" }}>Please fill out all required fields.</p>

      {status && <div style={{ padding: "16px", background: status.includes("successfully") ? "#d1fae5" : "#fee2e2", color: status.includes("successfully") ? "#065f46" : "#b91c1c", borderRadius: "8px", marginBottom: "24px" }}>{status}</div>}

      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="form-row">
          <label style={{fontWeight: "600", fontSize: "0.9rem"}}>Full Name</label>
          <input className="input" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <label style={{fontWeight: "600", fontSize: "0.9rem"}}>Email Address</label>
          <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        {role === "teacher" && (
          <>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>Institution</label><input className="input" name="institution" value={formData.institution} onChange={handleChange} required /></div>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>Department</label><input className="input" name="department" value={formData.department} onChange={handleChange} required /></div>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>Years of Experience</label><input className="input" name="experience" value={formData.experience} onChange={handleChange} required /></div>
          </>
        )}

        {role === "student" && (
          <>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>College / University</label><input className="input" name="college" value={formData.college} onChange={handleChange} required /></div>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>Course / Major</label><input className="input" name="course" value={formData.course} onChange={handleChange} required /></div>
            <div className="form-row"><label style={{fontWeight: "600", fontSize: "0.9rem"}}>Graduation Year</label><input className="input" name="year" value={formData.year} onChange={handleChange} required /></div>
          </>
        )}

        <button className="btn btn-primary" type="submit" style={{ marginTop: "16px" }}>Submit Request</button>
      </form>
    </div>
  );
}
