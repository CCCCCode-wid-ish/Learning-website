const Quiz = require("../models/quizModel");
const Course = require("../models/courseModel");

const createQuiz = async (req, res) => {
  try {
    const { courseId, title, description, questions } = req.body;

    // Verify course belongs to teacher
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (course.teacherId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to add quizzes to this course" });
    }

    const newQuiz = new Quiz({
      courseId,
      title,
      description,
      questions: questions || [],
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesByCourse,
  getQuizById,
};
