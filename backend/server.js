require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const roomRoutes = require("./routes/roomRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");
const connectDB =
require("./config/db");
const app = express();
connectDB();
const messRoutes =
require("./routes/messRoutes");
const feedbackRoutes =
require("./routes/feedbackRoutes");

// MIDDLEWARE

app.use(cors());

app.use(express.json());

// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/api/mess",
    messRoutes
);

app.use(
    "/api/feedback",
    feedbackRoutes
);

//  TEST ROUTE

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MANIT Hostel Backend Running"
    });
});

// START SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});