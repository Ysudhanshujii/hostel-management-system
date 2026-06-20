const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const RoomRequest = require("../models/RoomRequest");

router.get("/stats", async (req, res) => {

    const totalStudents =
        await Student.countDocuments();

    const totalRooms =
        await Room.countDocuments();

    const occupiedRooms =
        await Room.countDocuments({
            students: { $ne: [] }
        });

    const availableRooms =
        totalRooms - occupiedRooms;

    const pendingComplaints =
        await Complaint.countDocuments({
            status: "Pending"
        });

    const pendingRequests =
        await RoomRequest.countDocuments({
            status: "Pending"
        });

    res.json({

        totalStudents,

        availableRooms,

        occupiedRooms,

        pendingComplaints,

        pendingRequests

    });

});

module.exports = router;