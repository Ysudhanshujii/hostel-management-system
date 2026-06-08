const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

    roomNo: {
        type: String,
        required: true,
        unique: true
    },

    type: String,

    capacity: Number,

    students: [String]

});

module.exports =
mongoose.model(
    "Room",
    roomSchema
);