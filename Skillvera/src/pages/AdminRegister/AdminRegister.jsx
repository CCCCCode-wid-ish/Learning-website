import React, { useState } from "react";
import { registerAdmin } from "../../services/adminService";

export default function AdminRegister() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", phone: "", employeeId: "", department: "" });
  const [document, setDocument] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      setDocument(null);
    } else {
      setDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document) {
      alert("Please upload a verification document.");
      return;
    }

    try {
      await registerAdmin({ ...formData, document });
      setStatus("Admin registration request submitted to Super Admin correctly.");
      setFormData({ fullName: "", email: "", password: "", phone: "", employeeId: "", department: "" });
      setDocument(null);
    } catch (err) {
      setStatus("Failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Admin Staff Registration</h2>
      <p style={{ color: "#666", marginBottom: "24px" }}>Register for administrative console access. Your account will remain pending until approved by the Super Admin authority.</p>

      {status && <div style={{ padding: "16px", background: status.includes("submitted") ? "#d1fae5" : "#fee2e2", color: status.includes("submitted") ? "#065f46" : "#b91c1c", borderRadius: "8px", marginBottom: "24px" }}>{status}</div>}

      <form onSubmit={handleSubmit} className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Full Name</label><input className="input" name="fullName" value={formData.fullName} onChange={handleChange} required /></div>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Employee ID</label><input className="input" name="employeeId" value={formData.employeeId} onChange={handleChange} required /></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Email Address</label><input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Phone Number</label><input className="input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Password</label><input className="input" type="password" name="password" value={formData.password} onChange={handleChange} minLength={6} required /></div>
          <div className="form-row"><label style={{fontSize: "0.9rem", fontWeight: "600"}}>Department</label><input className="input" name="department" value={formData.department} onChange={handleChange} required /></div>
        </div>

        <div className="form-row" style={{ marginTop: "16px", padding: "16px", border: "1px dashed #d1d5db", borderRadius: "8px", background: "#f9fafb" }}>
          <label style={{ marginBottom: "8px", fontSize: "0.9rem", fontWeight: "600" }}>Upload Verification Document (Max 5MB: PDF, DOCX, JPG, PNG)</label>
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required />
        </div>

        <button className="btn btn-primary" type="submit" style={{ marginTop: "16px", padding: "16px", fontSize: "1.05rem" }}>Submit Registration</button>
      </form>
    </div>
  );
}
