import React, { useState, useEffect, useContext } from "react";
import Table from "../../assets/components/Table/Table";
import { AuthContext } from "../../assets/context/AuthContext";
import { getAdminRequests, approveAdmin, rejectAdmin } from "../../services/adminService";

export default function SuperAdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useContext(AuthContext);

  const fetchRequests = async () => {
    try {
      const data = await getAdminRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveAdmin(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to approve admin request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectAdmin(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to reject");
    }
  };

  if (role !== "superadmin") {
    return <div style={{ padding: "40px" }}>Access Denied. You are not a Super Admin.</div>;
  }

  const columns = ["name", "email", "phone", "role", "department", "document", "status", "actions"];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <header style={{ marginBottom: "32px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
        <h2>Super Admin Panel</h2>
        <p style={{ color: "#6b7280" }}>Review and manage new Administrator applications scaling across the platform.</p>
      </header>

      {loading ? (
        <p>Loading application requests...</p>
      ) : (
        <section className="glass-panel" style={{ padding: "0" }}>
          <Table 
            data={requests.map(r => ({...r, role: "admin"}))} 
            columns={columns} 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        </section>
      )}
    </div>
  );
}
