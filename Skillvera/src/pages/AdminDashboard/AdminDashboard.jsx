import React, { useState, useEffect, useContext } from "react";
import Table from "../../assets/components/Table/Table";
import { AuthContext } from "../../assets/context/AuthContext";
import { getUserRequests, approveUser, rejectUser } from "../../services/userService";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useContext(AuthContext);

  const fetchRequests = async () => {
    try {
      const data = await getUserRequests();
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
      await approveUser(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to reject");
    }
  };

  if (role !== "admin" && role !== "superadmin") {
    return <div style={{ padding: "40px" }}>Access Denied. Admins Only.</div>;
  }

  const columns = ["name", "email", "phone", "role", "department", "document", "status", "actions"];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
      <header style={{ marginBottom: "32px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
        <h2>Admin Console</h2>
        <p style={{ color: "#6b7280" }}>Approve and manage portal access requests from incoming Students and Teachers.</p>
      </header>

      {loading ? (
        <p>Loading user requests...</p>
      ) : (
        <section className="glass-panel" style={{ padding: "0" }}>
          <Table 
            data={requests} 
            columns={columns} 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        </section>
      )}
    </div>
  );
}
