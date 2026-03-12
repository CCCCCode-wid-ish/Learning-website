import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // For adding new lesson
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonContent, setNewLessonContent] = useState("");

  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`);
      const data = await res.json();
      if (res.ok) {
        setCourse(data.course);
        setLessons(data.lessons || []);
      }
      
      const resQuiz = await fetch(`http://localhost:5000/api/quizzes/course/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resQuiz.ok) {
        setQuizzes(await resQuiz.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: id,
          title: newLessonTitle,
          content: newLessonContent
        })
      });
      if (res.ok) {
        setNewLessonTitle("");
        setNewLessonContent("");
        fetchCourse();
      } else {
        alert("Failed to add lesson");
      }
    } catch (err) {
      alert("Error adding lesson");
    }
  };

  const handleCreateMockQuiz = async () => {
    try {
      const mockQuiz = {
        courseId: id,
        title: "Mock Quiz " + (quizzes.length + 1),
        description: "A dynamically generated mock quiz for testing.",
        questions: [
          { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
          { question: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"], correctAnswer: 2 }
        ]
      };
      const res = await fetch(`http://localhost:5000/api/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(mockQuiz)
      });
      if (res.ok) fetchCourse();
      else alert("Failed to add quiz");
    } catch (err) {
      console.error("Error creating mock quiz", err);
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p style={{ fontSize: "1.1rem" }}>{course.description}</p>
      
      <section style={{ marginTop: "32px" }}>
        <h3>Lessons</h3>
        {lessons.length === 0 ? (
          <p>No lessons yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            {lessons.map((lesson, idx) => (
              <div key={lesson._id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
                <h4>{idx + 1}. {lesson.title}</h4>
                <p style={{ whiteSpace: "pre-wrap", marginTop: "8px", color: "#444" }}>{lesson.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: "32px", marginBottom: "32px" }}>
        <h3>Assessments & Quizzes</h3>
        {quizzes.length === 0 ? (
          <p>No quizzes available yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", marginTop: "16px" }}>
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="glass-panel" style={{ padding: "16px" }}>
                <h4>{quiz.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "8px" }}>{quiz.description}</p>
                <button className="btn btn-primary" onClick={() => navigate("/quizzes/" + quiz._id)} style={{ marginTop: "16px" }}>Take Quiz</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {(role === "admin" || (role === "teacher" && course.teacherId?._id === localStorage.getItem("userId"))) && (
        <section style={{ marginTop: "32px", padding: "16px", background: "#f9f9f9", borderRadius: "8px" }}>
          <h3>Add New Lesson</h3>
          <form onSubmit={handleAddLesson} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px", marginTop: "16px" }}>
            <div className="form-row">
              <label>Lesson Title</label>
              <input 
                className="input" 
                value={newLessonTitle} 
                onChange={(e) => setNewLessonTitle(e.target.value)} 
                required 
              />
            </div>
            <div className="form-row">
              <label>Lesson Content</label>
              <textarea 
                className="input" 
                rows={5}
                value={newLessonContent} 
                onChange={(e) => setNewLessonContent(e.target.value)} 
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Add Lesson</button>
          </form>

          <hr style={{ margin: "32px 0", borderTop: "1px solid #ddd" }} />
          <h3>Add New Quiz</h3>
          <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "16px" }}>Click to generate an automated mock quiz for this course.</p>
          <button className="btn" onClick={handleCreateMockQuiz}>Generate Mock Quiz</button>
        </section>
      )}
    </div>
  );
}
