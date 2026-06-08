const express = require("express");

const router = express.Router();

const Feedback =
require("../models/Feedback");

/* Submit Feedback */

router.post("/", async (req, res) => {

    const feedback =
        await Feedback.create(
            req.body
        );

    res.json({
        success: true,
        feedback
    });

});

/* Get All Feedback */

router.get("/", async (req, res) => {

    const feedbacks =
        await Feedback.find()
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        feedbacks
    });

});

module.exports = router;