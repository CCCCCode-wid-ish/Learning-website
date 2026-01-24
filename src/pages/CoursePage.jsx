import React, { useState } from "react";

const demoCourses = [
  { id: 1, title: "React Basics", teacher: "Mr. Sharma" },
  { id: 2, title: "Data Structures", teacher: "Ms. Rao" },
];

export default function CoursePage() {
  const [courses, setCourses] = useState(demoCourses);
  const [newTitle, setNewTitle] = useState("");

  const createCourse = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle, teacher: "TBD" },
    ]);
    setNewTitle("");
  };

  return (
    <div>
      <h2>Courses</h2>
      <form onSubmit={createCourse} style={{ maxWidth: 420 }}>
        <div className="form-row">
          <label>Course Title</label>
          <input
            className="input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Create Course
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              {c.title} — <em>{c.teacher}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
