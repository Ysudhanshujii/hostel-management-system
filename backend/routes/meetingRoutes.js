const express = require("express");

const router = express.Router();



let announcements = [

    {
        id: 1,

        subject: "Mess Timing Update",

        points: [
            "Dinner timing changed to 8 PM",
            "Biometric attendance compulsory"
        ],

        createdAt: new Date()
    }

];

// GET ALL ANNOUNCEMENTS

router.get("/", (req, res) => {

    res.json({
        success: true,
        total: announcements.length,
        announcements
    });

});
// CREATE ANNOUNCEMENT

router.post("/", (req, res) => {

    const announcement = {

        id: Date.now(),

        subject: req.body.subject,

        points: req.body.points,

        createdAt: new Date()
    };

    announcements.unshift(announcement);

    res.json({
        success: true,
        message: "Announcement Created Successfully",
        announcement
    });

});

module.exports = router;