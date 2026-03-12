import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizTake() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setQuiz(await res.json());
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchQuiz();
  }, [quizId, token]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    if (!quiz) return;
    let currentScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  if (!quiz) return <p>Loading Quiz...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button className="btn" style={{ marginBottom: "20px" }} onClick={() => navigate(-1)}>
        &larr; Back to Course
      </button>

      <div className="glass-panel">
        <h2>{quiz.title}</h2>
        <p style={{ color: "#666", marginBottom: "32px" }}>{quiz.description}</p>

        {submitted ? (
          <div style={{ padding: "32px", textAlign: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px" }}>
            <h3 style={{ color: "#166534" }}>Quiz Complete!</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              You scored {score} out of {quiz.questions.length}
            </p>
            <p>
              Percentage: {Math.round((score / quiz.questions.length) * 100)}%
            </p>
          </div>
        ) : (
          <div>
            {quiz.questions.map((q, qIndex) => (
              <div key={qIndex} style={{ marginBottom: "32px" }}>
                <h4 style={{ marginBottom: "12px", fontSize: "1.1rem" }}>
                  {qIndex + 1}. {q.question}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {q.options.map((opt, oIndex) => (
                    <label key={oIndex} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: "#f9fafb", padding: "12px", borderRadius: "8px", border: answers[qIndex] === oIndex ? "2px solid #4f46e5" : "1px solid #e5e7eb" }}>
                      <input 
                        type="radio" 
                        name={`question-${qIndex}`} 
                        checked={answers[qIndex] === oIndex}
                        onChange={() => handleOptionChange(qIndex, oIndex)}
                        style={{ width: "18px", height: "18px", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.95rem" }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <button className="btn btn-primary" style={{ width: "100%", padding: "16px", fontSize: "1.1rem" }} onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
