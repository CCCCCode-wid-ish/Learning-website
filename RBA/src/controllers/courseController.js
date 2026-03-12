const Course = require("../models/courseModel");
const Lesson = require("../models/lessonModel");

const createCourse = async (req, res) => {
  try {
    const { title, description, category, imageUrl } = req.body;
    const teacherId = req.user.id;

    const newCourse = new Course({
      title,
      description,
      teacherId,
      category,
      imageUrl,
    });
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "teachername role");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacherId: req.user.id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ studentsEnrolled: req.user.id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacherId", "teachername role");
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 });
    res.status(200).json({ course, lessons });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.studentsEnrolled.includes(studentId)) {
      course.studentsEnrolled.push(studentId);
      await course.save();
    }
    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getTeacherCourses,
  getEnrolledCourses,
  getCourseById,
  enrollCourse,
};
