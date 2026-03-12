import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "0", background: "inherit" }}>
      {/* Hero Section */}
      <section style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        minHeight: "70vh",
        background: "white",
        padding: "0 5%"
      }}>
        <div style={{ flex: 1, padding: "40px", maxWidth: "800px" }}>
          <h1 style={{ fontSize: "3.5rem", color: "#111827", lineHeight: "1.2", marginBottom: "24px", letterSpacing: "-1.5px" }}>
            Role-Based Education Platform with <span style={{ color: "#4f46e5" }}>Smart Analytics</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#4b5563", marginBottom: "40px", lineHeight: "1.6" }}>
            Empower students, enable teachers, and assist administrators with scalable tools.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link to="/request-access" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "1.1rem" }}>
              Get Started
            </Link>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
          <div style={{ width: "100%", height: "400px", background: "linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)", borderRadius: "24px", opacity: 0.9, position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
            <div style={{ position: "absolute", inset: "10%", background: "rgba(255,255,255,0.1)", borderRadius: "16px", backdropFilter: "blur(10px)" }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 5%", background: "#f9fafb" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Platform Features</h2>
        </div>

        <div className="grid-cards" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Feature 1 */}
          <div className="glass-panel" style={{ background: "white" }}>
            <div style={{ width: "48px", height: "48px", background: "#e0e7ff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5", fontSize: "24px", marginBottom: "20px" }}>🛡️</div>
            <h3>Role-Based Access</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>Securely segment workspaces using fully dynamic RBAC logic.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-panel" style={{ background: "white" }}>
            <div style={{ width: "48px", height: "48px", background: "#fce7f3", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ec4899", fontSize: "24px", marginBottom: "20px" }}>✅</div>
            <h3>Admin Approval System</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>Rigorous on-boarding requests verified by Super Admins and Admins.</p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel" style={{ background: "white" }}>
            <div style={{ width: "48px", height: "48px", background: "#d1fae5", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", fontSize: "24px", marginBottom: "20px" }}>📊</div>
            <h3>Analytics Dashboard</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>Review extensive data reporting interfaces built natively.</p>
          </div>

          {/* Feature 4 */}
          <div className="glass-panel" style={{ background: "white" }}>
            <div style={{ width: "48px", height: "48px", background: "#fef3c7", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", fontSize: "24px", marginBottom: "20px" }}>🔒</div>
            <h3>Secure Authentication</h3>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>JWT encrypted user flows protect the institution’s private resources.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
