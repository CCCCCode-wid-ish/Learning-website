const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/authorizeRoles");
const router = express.Router();

const Teacher = require("../models/teacherModel"); // since this acts as the user model

//Only admin can access this router
router.get("/admin",verifyToken,authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
})

//Both admin and teacher can access this router
router.get("/teacher",verifyToken, authorizeRoles("admin","teacher"),(req, res) => {
  res.json({ message: "Welcome Teacher" });
});

//All can access this router
router.get(
  "/student",
  verifyToken,
  authorizeRoles("admin", "teacher","student"),
  (req, res) => {
    res.json({ message: "Welcome Student " });
  },
);

router.get("/users", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const role = req.query.role;
    let query = {};
    if (role) {
      query.role = role;
    }
    const users = await Teacher.find(query).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;