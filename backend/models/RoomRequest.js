const mongoose =
require("mongoose");

const roomRequestSchema =
new mongoose.Schema({

    rollNo: String,

    currentRoom: String,

    desiredRoom: String,

    reason: String,

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
    "RoomRequest",
    roomRequestSchema
);