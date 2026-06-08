const express = require("express");

const router = express.Router();
const Student = require("../models/Student");

// ADMIN LOGIN

router.post("/admin-login", (req, res) => {


const { username, password } = req.body;

if (username === "Sudhanshu" && password === "Sujit@12") {

    return res.json({
        success: true,
        role: "admin",
        message: "Admin Login Successful"
    });

}

res.status(401).json({
    success: false,
    message: "Invalid Admin Credentials"
});


});

// register student

router.post("/register", async (req, res) => {

   

    try {

        const existingStudent =
            await Student.findOne({
                rollNo: req.body.rollNo
            });

        if (existingStudent) {

            return res.status(400).json({
                success: false,
                message: "Student already registered"
            });

        }

        const student =
            await Student.create(req.body);

       
        res.json({
            success: true,
            message: "Registration Successful",
            student
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

// STUDENT LOGIN

router.post("/student-login", async (req, res) => {

    const { scholar } = req.body;

    const student = await Student.findOne({
        rollNo: scholar
    });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.json({
        success: true,
        role: "student",
        message: "Student Login Successful",
        student
    });

});

// FORGOT PASSWORD

router.post("/forgot-password", (req, res) => {


const scholarNo = req.body.scholarNo;

if (!scholarNo) {

    return res.status(400).json({
        success: false,
        message: "Scholar Number Required"
    });

}

res.json({
    success: true,
    message: "Password Reset Link Sent Successfully"
});


});
console.log("Auth Routes Loaded");

module.exports = router;
