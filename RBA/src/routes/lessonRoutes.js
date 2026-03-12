const express = require("express");
const { createLesson, getLessonById } = require("../controllers/lessonController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("admin", "teacher"), createLesson);
router.get("/:id", verifyToken, getLessonById);

module.exports = router;
