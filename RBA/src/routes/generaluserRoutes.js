const express = require("express");
const Teacher = require("../models/teacherModel"); // Since 'Teacher' schema serves as the universal user database for both teachers and students
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

// Only admin should be able to see registered system users optionally filtered by role
router.get("/", verifyToken, authorizeRoles("admin", "superadmin"), async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    // Exclude superadmins broadly if needed, but not strictly required
    const users = await Teacher.find(filter).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

module.exports = router;
