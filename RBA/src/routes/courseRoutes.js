const express = require("express");
const { getCourses, createCourse, enrollCourse, getCourseById } = require("../controllers/courseController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.get("/", verifyToken, getCourses);
router.post("/", verifyToken, authorizeRoles("admin", "teacher"), createCourse);
router.post("/enroll/:id", verifyToken, authorizeRoles("student"), enrollCourse);
router.get("/:id", verifyToken, getCourseById);

module.exports = router;
