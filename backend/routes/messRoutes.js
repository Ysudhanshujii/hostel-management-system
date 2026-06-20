const express = require("express");
const router = express.Router();

const Mess =
require("../models/mess");

/* Get Menu */

router.get("/", async (req, res) => {

    const menu =
        await Mess.find()
        .sort({ day: 1 });

    res.json({
        success: true,
        menu
    });

});

/* Update Menu */

router.put("/", async (req, res) => {

    const {
        day,
        breakfast,
        lunch,
        dinner
    } = req.body;

    const menu =
        await Mess.findOneAndUpdate(

            { day },

            {
                breakfast,
                lunch,
                dinner
            },

            {
                new: true
            }

        );

    res.json({

        success: true,

        menu

    });

});

module.exports = router;