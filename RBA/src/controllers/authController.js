const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");

const register = async (req, res) => {
  try {
    const { teachername, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
      teachername,
      password: hashedPassword,
      role,
    });
    await newTeacher.save();
    res
      .status(201)
      .json({ message: `teacher registered with the name ${teachername}` });
  } catch (err) {
    console.log(err);  // add this
    res.status(500).json({ message: err.message }); // change this
  }
}

const login = async (req, res) => {
  try {
    const { teachername, password } = req.body;
    const teacher = await Teacher.findOne({ teachername: teachername });

    if (!teacher) {
      return res
        .status(404)
        .json({ message: `User name with ${teachername} not found` });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid credential` });
    }

    const token = jwt.sign(
      { id: teacher._id, role: teacher.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ token, role: teacher.role, username: teacher.teachername, userId: teacher._id });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};

module.exports = { register, login };
