import React from "react";

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <ul className="list">
      {students.map((s) => (
        <li key={s.id} style={{ marginBottom: 8 }}>
          <strong>{s.name}</strong> — {s.email}{" "}
          <span
            className={`badge ${
              s.feeStatus === "Paid"
                ? "status-paid"
                : s.feeStatus === "Pending"
                ? "status-pending"
                : "status-overdue"
            }`}
          >
            {s.feeStatus}
          </span>
          <div style={{ marginTop: 6 }}>
            <button
              className="btn"
              onClick={() => onEdit(s)}
              style={{ marginRight: 8 }}
            >
              Edit
            </button>
            <button className="btn" onClick={() => onDelete(s.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
