const Lesson = require("../models/lessonModel");
const Course = require("../models/courseModel");

const createLesson = async (req, res) => {
  try {
    const { courseId, title, content, videoUrl, order } = req.body;
    
    // Verify course belongs to teacher
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (course.teacherId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to add lessons to this course" });
    }

    const newLesson = new Lesson({
      courseId,
      title,
      content,
      videoUrl,
      order: order || 0,
    });
    await newLesson.save();
    res.status(201).json({ message: "Lesson created successfully", lesson: newLesson });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLesson,
  getLessonById,
};
