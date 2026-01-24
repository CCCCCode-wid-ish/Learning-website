
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//wenever the teacher successfully logged in we will give the token to the teacher 
const Teacher = require('../models/teacherModel')

const register = async (req, res) => {
  try {
    const { teachername, password, role } = req.body;
    //destructing of the value these 3 values shld have
    // properties on the user object wenever we create a models
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({ teachername, password: hashedPassword, role })
    await newTeacher.save();
    res
      .status(201)
      .json({ message: `teacher registered with the name ${teachername}` });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something went wrong` });
    
  }
};



  const login = async (req, res) => {
    try {
      const { teachername, password } = req.body;
      const teacher = await Teacher.findOne({ username })
  
      if (!teacher) {
        return res
          .status(404)
          .json({ message: `User name with ${teachername} not found` })
    
      }
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({ message: `Invalid credential` })
      }

      const token = jwt.sign(
        { id: username._id, role: teacher.role }, process.env.JWT_SECRET,
        { expiresIn: "1h" }
    
      );
        
      res.status(200).json({ token });


    } catch (err) {
      res
        .status(500)
        .json({ message: `Something went wrong` });
    

    }
  }

  module.exports = {
    register,
    login,
  }
