const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const authorizeRoles = require("../middlewares/authorizeRoles");
const router = express.Router();

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

module.exports = router;