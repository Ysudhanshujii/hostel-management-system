const express = require("express");

const router = express.Router();

const Complaint =
require("../models/Complaint");


router.post("/", async (req, res) => {

    try {

        const complaint = await Complaint.create({

            rollNo: req.body.rollNo,

            roomNo: req.body.roomNo,

            category: req.body.category,

            description: req.body.description,

            status: "Pending",

            createdAt: new Date()

        });

        res.json({

            success: true,

            message: "Complaint Submitted Successfully",

            complaint

        });

    }

    catch(error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

});

// GET ALL COMPLAINTS

router.get("/", async (req, res) => {

    try {

        const complaints =
            await Complaint.find();

        res.json({
            success: true,
            total: complaints.length,
            complaints
        });

    }

    catch(error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});

// UPDATE COMPLAINT STATUS

router.put("/:id", async (req, res) => {

    try {

        const complaint =
            await Complaint.findByIdAndUpdate(

                req.params.id,

                {
                    status:
                    req.body.status
                },

                {
                    new: true
                }

            );

        if (!complaint) {

            return res.status(404).json({
                success: false,
                message:
                "Complaint Not Found"
            });

        }

        res.json({
            success: true,
            message:
            "Complaint Status Updated",
            complaint
        });

    }

    catch(error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});

module.exports = router;