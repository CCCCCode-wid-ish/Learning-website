const mongoose = require("mongoose");


const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true

    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "student", "teacher"],
    }
},


    {
        timestamps: true,
    });

    module.exports = mongoose.model("Teacher", teacherSchema);