const mongoose = require("mongoose");

const userRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher"], required: true },
    institution: { type: String },
    department: { type: String },
    experience: { type: String },
    college: { type: String },
    course: { type: String },
    year: { type: String },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserRequest", userRequestSchema);
