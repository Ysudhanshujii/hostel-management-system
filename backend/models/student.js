const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    rollNo: {
        type: String,
        required: true,
        unique: true
    },

    studentName: {
        type: String,
        required: true
    },

    email: String,

    branch: String,

    password: String

});

module.exports =
mongoose.models.Student ||
mongoose.model(
    "Student",
    studentSchema
);