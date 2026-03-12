const AdminRequest = require("../models/adminRequestModel");
const Teacher = require("../models/teacherModel"); // Since Teacher model acts as universal user
const bcrypt = require("bcryptjs");

const registerAdminRequest = async (req, res) => {
  try {
    const { fullName, email, password, phone, employeeId, department } = req.body;
    const documentUrl = req.file ? req.file.path : null;

    const existingUser = await Teacher.findOne({ teachername: email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin email already exists in system." });
    }

    const newRequest = new AdminRequest({
      fullName,
      email,
      password, // Intentionally saving password as plain or hashed here temporarily for approval. Better to hash immediately:
      phone,
      employeeId,
      department,
      documentUrl,
    });
    
    // Hash password immediately for security
    const salt = await bcrypt.genSalt(10);
    newRequest.password = await bcrypt.hash(password, salt);

    await newRequest.save();
    res.status(201).json({ message: "Admin registration request submitted.", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminRequests = async (req, res) => {
  try {
    const requests = await AdminRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveAdmin = async (req, res) => {
  try {
    const adminReq = await AdminRequest.findById(req.params.id);
    if (!adminReq || adminReq.status !== "PENDING") {
      return res.status(400).json({ message: "Request not found or already processed" });
    }

    adminReq.status = "APPROVED";
    await adminReq.save();

    // Add them to actual users table
    const newAdmin = new Teacher({
      teachername: adminReq.email, // using email as teachername for login
      password: adminReq.password,
      role: "admin",
    });
    await newAdmin.save();

    res.status(200).json({ message: "Admin approved successfully", request: adminReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectAdmin = async (req, res) => {
  try {
    const adminReq = await AdminRequest.findById(req.params.id);
    if (!adminReq || adminReq.status !== "PENDING") {
      return res.status(400).json({ message: "Request not found or already processed" });
    }
    adminReq.status = "REJECTED";
    await adminReq.save();
    res.status(200).json({ message: "Admin rejected successfully", request: adminReq });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerAdminRequest, getAdminRequests, approveAdmin, rejectAdmin };
