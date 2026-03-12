const express = require("express");
const multer = require("multer");
const { registerAdminRequest, getAdminRequests, approveAdmin, rejectAdmin } = require("../controllers/adminRequestController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("document"), registerAdminRequest);
// Only a super admin should ordinarily see this, but for testing we'll assume "admin" role includes super admin or we allow fetching requests
router.get("/requests", getAdminRequests); 
router.put("/approve/:id", approveAdmin);
router.put("/reject/:id", rejectAdmin);

module.exports = router;
