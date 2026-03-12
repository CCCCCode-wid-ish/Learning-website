const express = require("express");
const { createQuiz, getQuizzesByCourse, getQuizById } = require("../controllers/quizController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("teacher", "admin"), createQuiz);
router.get("/course/:courseId", verifyToken, getQuizzesByCourse);
router.get("/:id", verifyToken, getQuizById);

module.exports = router;
