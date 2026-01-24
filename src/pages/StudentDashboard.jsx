import React, { useState } from "react";
import { initialStudents } from "../data/students.js";

export default function StudentDashboard() {
  const [students] = useState(initialStudents);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const submitNote = (e) => {
    e.preventDefault();
    if (!note) return;
    setNotes((prev) => [{ id: Date.now(), text: note }, ...prev]);
    setNote("");
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Hi student — here are your courses and messages.</p>

      <section style={{ marginTop: 12 }}>
        <h3>Classmates</h3>
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} —{" "}
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
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Notes / Announcements (demo)</h3>
        <form onSubmit={submitNote}>
          <input
            className="input"
            placeholder="Write a note or question"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-primary" type="submit">
              Post
            </button>
          </div>
        </form>

        <div style={{ marginTop: 12 }}>
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            <ul>
              {notes.map((n) => (
                <li key={n.id}>{n.text}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
