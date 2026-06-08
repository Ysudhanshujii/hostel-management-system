const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({

    rollNo: {
        type: String,
        required: true
    },

    roomNo: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
mongoose.model(
    "Complaint",
    complaintSchema
);