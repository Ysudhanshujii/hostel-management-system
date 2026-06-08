const express = require("express");

const router = express.Router();

const Room =
require("../models/Room");

const RoomRequest =
require("../models/RoomRequest");


// GET ALL ROOMS

router.get("/all", async (req, res) => {

    const rooms =
        await Room.find();

    res.json({
        success: true,
        rooms
    });

});

// ALLOCATE ROOM TO STUDENT

router.post(
"/change-request",
async (req, res) => {

    const request =
        await RoomRequest.create(
            req.body
        );

    res.json({
        success: true,
        message:
        "Room Change Request Submitted",
        request
    });

});

// GET ALL ROOM CHANGE REQUESTS

router.get(
"/change-request",
async (req, res) => {

    const requests =
        await RoomRequest.find();

    res.json({
        success: true,
        total: requests.length,
        requests
    });

});

// UPDATE ROOM CHANGE REQUEST STATUS

router.put(
    "/change-request/:id",
    async (req, res) => {

        try {

          const request =
    await RoomRequest.findById(
        req.params.id
    );

if (!request) {

    return res.status(404).json({
        success: false,
        message: "Request Not Found"
    });

}

if (request.status === "Approved") {

    return res.status(400).json({
        success: false,
        message: "Request Already Approved"
    });



                return res.status(404).json({
                    success: false,
                    message: "Request Not Found"
                });

            }

            if (req.body.status === "Approved") {

                const oldRoom =
                    await Room.findOne({
                        roomNo:
                        request.currentRoom
                    });

                const newRoom =
                    await Room.findOne({
                        roomNo:
                        request.desiredRoom
                    });

              
                if (!oldRoom || !newRoom) {

                    return res.status(404).json({
                        success: false,
                        message: "Room Not Found"
                    });

                }

                if (
                    newRoom.students.length >=
                    newRoom.capacity
                ) {

                    return res.status(400).json({
                        success: false,
                        message:
                        "Desired Room is Full"
                    });

                }

                // Remove student from old room
                oldRoom.students =
                    oldRoom.students.filter(
                        student =>
                            student !==
                            request.rollNo
                    );

                // Add student to new room
               if (
    !newRoom.students.includes(
        request.rollNo
    )
) {

    newRoom.students.push(
        request.rollNo
    );

}

                await oldRoom.save();
                await newRoom.save();

                
            }

            request.status =
                req.body.status;

            await request.save();

            res.json({

                success: true,

                message:
                "Request Updated Successfully",

                request

            });

        }

        catch(error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                "Server Error"

            });

        }

    }
);
router.post("/allocate", async (req, res) => {

    const studentId =
        req.body.studentId.trim();

    const roomNo =
        req.body.roomNo.trim();

    const room =
        await Room.findOne({
            roomNo
        });

    if (!room) {

        return res.status(404).json({
            success: false,
            message: "Room Not Found"
        });

    }

    if (
        room.students.length
        >= room.capacity
    ) {

        return res.status(400).json({
            success: false,
            message: "Room Full"
        });

    }

    room.students.push(studentId);

    await room.save();

    res.json({
        success: true,
        message:
        "Room Allocated Successfully",
        room
    });

});
module.exports = router;