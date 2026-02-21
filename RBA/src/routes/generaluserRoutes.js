const express = require("express");
const verifyToken = require("../middlewares/authMiddleware")
const router = express.Router();

//Only admin can access this router
router.get("/admin", (req, res) => {
    res.json({ message: "Welcome Admin" });
})

//Both admin and teacher can access this router
router.get("/teacher", (req, res) => {
  res.json({ message: "Welcome Teacher" });
});

//All can access this router
router.get("/student", (req, res) => {
  res.json({ message: "Welcome Student " });
});

module.exports = router;