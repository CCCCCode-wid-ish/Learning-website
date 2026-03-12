const express = require("express");
const { requestAccess, getUserRequests, approveUser, rejectUser } = require("../controllers/userRequestController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.post("/request", requestAccess);
router.get("/requests", getUserRequests);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);

module.exports = router;
