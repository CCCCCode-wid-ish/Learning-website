import React, { useState } from "react";
import { initialStudents } from "../data/students.js";
import { initialTeachers } from "../data/teachers.js";
import StudentList from "../components/StudentList.jsx";
import useForm from "../hooks/useForm";

export default function AdminDashboard() {
  const [students, setStudents] = useState(initialStudents);
  const [teachers] = useState(initialTeachers);
  const { form, setField, reset, setForm, errors, setErrors } = useForm({
    name: "",
    email: "",
    feeStatus: "Pending",
  });
  const [editingId, setEditingId] = useState(null);

  const saveStudent = (e) => {
    e && e.preventDefault();
    const err = {};
    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    setErrors(err);
    if (Object.keys(err).length) return;

    if (editingId) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...form, id: editingId } : s
        )
      );
      setEditingId(null);
    } else {
      const id = Date.now();
      setStudents((prev) => [...prev, { id, ...form }]);
    }
    reset();
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      feeStatus: student.feeStatus,
    });
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Delete student?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const changeStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, feeStatus: status } : s))
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section style={{ marginTop: 12 }}>
        <h3>Manage Students</h3>
        <form onSubmit={saveStudent} style={{ maxWidth: 520 }}>
          <div className="form-row">
            <label>Name</label>
            <input
              name="name"
              className="input"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {errors.name && (
              <small style={{ color: "#c53030" }}>{errors.name}</small>
            )}
          </div>
          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              className="input"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && (
              <small style={{ color: "#c53030" }}>{errors.email}</small>
            )}
          </div>
          <div className="form-row">
            <label>Fee Status</label>
            <select
              className="input"
              value={form.feeStatus}
              onChange={(e) => setField("feeStatus", e.target.value)}
            >
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" type="submit">
              {editingId ? "Update Student" : "Add Student"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                reset();
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        <div style={{ marginTop: 16 }}>
          <StudentList
            students={students}
            onEdit={startEdit}
            onDelete={deleteStudent}
          />
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <h3>Quick Actions</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => changeStatus(2, "Paid")}>
            Mark Catherine Paid
          </button>
          <button className="btn" onClick={() => setStudents([])}>
            Clear Students (demo)
          </button>
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <h3>Teachers ({teachers.length})</h3>
        <ul>
          {teachers.map((t) => (
            <li key={t.id}>
              {t.name} — {t.subject}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
