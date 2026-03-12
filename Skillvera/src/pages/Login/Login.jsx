import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../assets/context/AuthContext";
import { loginUser } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out both fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const authData = await loginUser({ email, password });
      
      // Load into global AuthContext
      login({ 
        token: authData.token, 
        role: authData.user.role, 
        username: authData.user.name, 
        userId: authData.userId // Optional mapping if backend passes it
      });
      
      // Redirect based on role mapped from markdown design
      const roleStr = authData.user.role?.toLowerCase() || "";
      if (roleStr === "superadmin") navigate("/superadmin");
      else if (roleStr === "admin") navigate("/admin");
      else if (roleStr === "teacher") navigate("/teacher");
      else navigate("/student");

    } catch (err) {
      setError(err.message || "Invalid credentials. If you are new, wait for admin approval.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "inherit" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "440px", padding: "40px", border: "1px solid #e5e7eb", borderRadius: "16px", background: "white", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Sign In</h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "32px" }}>Access your personalized dashboard.</p>
        
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && <div style={{ padding: "12px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", fontSize: "0.9rem" }}>{error}</div>}
          
          <div className="form-row">
            <label style={{ marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Email Address</label>
            <input 
              className="input" 
              type="text" 
              placeholder="user@skillvera.edu" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-row">
            <label style={{ marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Password</label>
            <input 
              className="input" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: "16px", padding: "14px", fontSize: "1.05rem" }}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e5e7eb", textAlign: "center", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="#" onClick={(e) => { e.preventDefault(); alert("Contact an administrator to reset your password."); }} style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.85rem", fontWeight: "500" }}>Forgot Password?</Link>
          <Link to="/request-access" style={{ color: "#4f46e5", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>Don't have an account? Request access.</Link>
          <Link to="/admin-register" style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.85rem", fontWeight: "500" }}>Apply for Staff/Admin Role</Link>
        </div>
      </div>
    </div>
  );
}
