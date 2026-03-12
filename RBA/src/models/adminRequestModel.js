const mongoose = require("mongoose");

const adminRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    employeeId: { type: String, required: true },
    department: { type: String, required: true },
    documentUrl: { type: String }, // For the file upload URL or path
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminRequest", adminRequestSchema);
