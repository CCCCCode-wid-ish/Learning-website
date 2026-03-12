const UserRequest = require("../models/userRequestModel");
const Teacher = require("../models/teacherModel"); // Since Teacher schema serves as universal user
const bcrypt = require("bcryptjs");

const requestAccess = async (req, res) => {
  try {
    const newRequest = new UserRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Access request submitted.", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserRequests = async (req, res) => {
  try {
    const requests = await UserRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveUser = async (req, res) => {
  try {
    const userReq = await UserRequest.findById(req.params.id);
    if (!userReq || userReq.status !== "PENDING") {
      return res.status(400).json({ message: "Request not found or already processed" });
    }

    userReq.status = "APPROVED";
    await userReq.save();

    // Default password for approved user is "password123" (since they don't set it in request form initially)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const newUser = new Teacher({
      teachername: userReq.email, 
      password: hashedPassword,
      role: userReq.role,
    });
    await newUser.save();

    res.status(200).json({ message: "User approved successfully", request: userReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectUser = async (req, res) => {
  try {
    const userReq = await UserRequest.findById(req.params.id);
    if (!userReq || userReq.status !== "PENDING") {
      return res.status(400).json({ message: "Request not found or already processed" });
    }
    userReq.status = "REJECTED";
    await userReq.save();
    res.status(200).json({ message: "User rejected successfully", request: userReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { requestAccess, getUserRequests, approveUser, rejectUser };
