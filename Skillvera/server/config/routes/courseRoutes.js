const express = require("express");
const { 
  createCourse, 
  getCourses, 
  getTeacherCourses, 
  getEnrolledCourses, 
  getCourseById, 
  enrollCourse 
} = require("../controllers/courseController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.get("/", getCourses);
router.get("/my-courses", verifyToken, authorizeRoles("teacher", "admin"), getTeacherCourses);
router.get("/enrolled", verifyToken, authorizeRoles("student", "teacher", "admin"), getEnrolledCourses);
router.get("/:id", getCourseById);
router.post("/", verifyToken, authorizeRoles("teacher", "admin"), createCourse);
router.post("/:id/enroll", verifyToken, authorizeRoles("student", "teacher", "admin"), enrollCourse);

module.exports = router;
