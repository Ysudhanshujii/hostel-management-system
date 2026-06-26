const role = localStorage.getItem("role");

if (role !== "admin") {

    alert("Unauthorized Access");

    window.location.href = "index.html";

}
let chartInstance = null;
let occupancyChart = null;

let complaintChart = null;

// Get count of each status

function getStatusCount(requests = []) {

    let pending = 0;
    let approved = 0;
    let rejected = 0;

    requests.forEach(req => {

        if (req.status === "Pending") {

            pending++;

        }

        else if (req.status === "Approved") {

            approved++;

        }

        else if (req.status === "Rejected") {

            rejected++;

        }

    });

    return {
        pending,
        approved,
        rejected
    };

}

// render status distribution chart

async function renderStatusChart() {

    const canvas =
        document.getElementById("statusChart");

    if (!canvas) return;

    try {

        const response = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request"
        );

        const data = await response.json();

        const requests = data.requests || [];

        const {
            pending,
            approved,
            rejected
        } = getStatusCount(requests);

        const ctx = canvas.getContext("2d");

        // Destroy Old Chart
        if (chartInstance) {

            chartInstance.destroy();

        }

        chartInstance = new Chart(ctx, {

            type: "pie",

            data: {

                labels: [
                    "Pending",
                    "Approved",
                    "Rejected"
                ],

                datasets: [{

                    data: [
                        pending,
                        approved,
                        rejected
                    ],

                    backgroundColor: [
                        "#f39c12",
                        "#27ae60",
                        "#e74c3c"
                    ]

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        });

        console.log(
            "Chart rendered:",
            pending,
            approved,
            rejected
        );

    } catch (error) {

        console.log(error);

    }

}

// load all complaints for dashboard

async function loadRequests() {

    const requestList =
        document.getElementById("requestList");

    if (!requestList) return;

    try {

        const response = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request"
        );

        const data = await response.json();

        requestList.innerHTML = "";

        data.requests.forEach((request) => {

            requestList.innerHTML += `

            <div class="request-card">

                <h3>
                    Roll No: ${request.rollNo}
                </h3>

                <p>
                    Current Room:
                    ${request.currentRoom}
                </p>

                <p>
                    Desired Room:
                    ${request.desiredRoom}
                </p>

                <p>
                    ${request.reason}
                </p>

               ${request.status === "Pending" ? `
<div class="actions">

    <button
        class="approve-btn"
        onclick="updateStatus('${request._id}', 'Approved')">

        Approve

    </button>

    <button
        class="reject-btn"
        onclick="updateStatus('${request._id}', 'Rejected')">

        Reject

    </button>

</div>

` : ""}

               <p class="final-status
    ${request.status === "Approved" ? "approved" : ""}
    ${request.status === "Rejected" ? "rejected" : ""}
">
    Request ${request.status}
</p>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}
// update request status

window.updateStatus = async function(id, status) {

    try {

        const response = await fetch(
            `https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        loadRequests();

        renderStatusChart();

    } catch (error) {

        console.log(error);

    }

};


async function renderComplaintChart() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/complaints"
            );

        const data =
            await response.json();

        const complaints =
            data.complaints || [];

        const pending =
            complaints.filter(
                c => c.status === "Pending"
            ).length;

        const resolved =
            complaints.filter(
                c => c.status === "Resolved"
            ).length;

        const ctx =
            document.getElementById(
                "complaintChart"
            );

        if (!ctx) return;

        if (complaintChart) {

            complaintChart.destroy();

        }

        complaintChart =
            new Chart(ctx, {

                type: "bar",

                data: {

                    labels: [
                        "Pending",
                        "Resolved"
                    ],

                    datasets: [{

                        label: "Complaints",

                        data: [
                            pending,
                            resolved
                        ]

                    }]

                }

            });

    }

    catch(error) {

        console.log(error);

    }

}

async function loadDashboardComplaints() {

    const container =
        document.getElementById(
            "dashboardComplaints"
        );

    if (!container) return;

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/complaints"
            );

        const data =
            await response.json();

        container.innerHTML = "";

        data.complaints.forEach(c => {

            container.innerHTML += `

            <div class="complaint-card">

                <h3>${c.category}</h3>

                <p>
                    Roll No:
                    ${c.rollNo}
                </p>

                <p>
                    Room No:
                    ${c.roomNo}
                </p>

                <p>
                    ${c.description}
                </p>

                <p>
                    Status:
                    <strong>
                        ${c.status}
                    </strong>
                </p>
${
    c.status === "Pending"
    ?
    `
    <button
        onclick="resolveComplaint('${c._id}')">

        Resolve

    </button>
    `
    :
    `
    <span
    style="color:green;font-weight:bold;">

     Resolved

    </span>
    `
}

            </div>
            `;

        });

    }

    catch(error) {

        console.log(error);

    }

}
window.resolveComplaint =
async function(id) {

    try {

        const response =
            await fetch(
                `https://hostel-management-system-h3xb.onrender.com/api/complaints/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        status: "Resolved"
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        loadDashboardComplaints();

        renderComplaintChart();

        loadStats();

    }

    catch(error) {

        console.log(error);

    }

};

async function renderOccupancyChart() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/rooms/all"
            );

        const data =
            await response.json();

        const rooms =
            data.rooms || [];

        const occupied =
            rooms.filter(room =>
                room.students &&
                room.students.length >= room.capacity
            ).length;

        const available =
            rooms.length - occupied;

        const ctx =
            document.getElementById(
                "occupancyChart"
            );

        if (!ctx) return;

        if (occupancyChart) {

            occupancyChart.destroy();

        }

        occupancyChart =
            new Chart(ctx, {

                type: "doughnut",

                data: {

                    labels: [
                        "Occupied",
                        "Available"
                    ],

                    datasets: [{

                        data: [
                            occupied,
                            available
                        ]

                    }]

                }

            });

    }

    catch(error) {

        console.log(error);

    }

}

// submit new complaint

async function loadStats() {

    try {

        const roomResponse = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/rooms/all"
        );

        const roomData =
            await roomResponse.json();

        const requestResponse = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request"
        );

        const requestData =
            await requestResponse.json();

        const rooms =
            roomData.rooms || [];

        const occupied =
            rooms.filter(room =>
                room.students &&
                room.students.length >= room.capacity
            ).length;

        const available =
            rooms.length - occupied;

        const pending =
            requestData.requests.filter(
                req => req.status === "Pending"
            ).length;

        document.getElementById(
            "availableRooms"
        ).innerText = available;

        document.getElementById(
            "occupiedRooms"
        ).innerText = occupied;

        document.getElementById(
            "pendingRequests"
        ).innerText = pending;

      
        
const complaintResponse =
    await fetch(
        "https://hostel-management-system-h3xb.onrender.com/api/complaints"
    );

const complaintData =
    await complaintResponse.json();

document.getElementById(
    "totalComplaints"
).innerText =
    complaintData.total;

    }

    catch(error) {

        console.log(error);

    }

}
async function loadQuickStats() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/dashboard/stats"
            );

        const data =
            await response.json();

        document.getElementById(
            "totalStudents"
        ).innerText =
            data.totalStudents;

        document.getElementById(
            "availableRooms"
        ).innerText =
            data.availableRooms;

        document.getElementById(
            "occupiedRooms"
        ).innerText =
            data.occupiedRooms;

        document.getElementById(
            "pendingRequests"
        ).innerText =
            data.pendingRequests;

        document.getElementById(
            "totalComplaints"
        ).innerText =
            data.pendingComplaints;

    }

    catch(error) {

        console.log(error);

    }

}
// load activity feed

async function loadActivityFeed() {

    const activityList =
        document.getElementById("activityList");

    if (!activityList) return;

    try {

        const requestResponse =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request"
            );

        const requestData =
            await requestResponse.json();

        activityList.innerHTML = "";

        const latestRequests =
            requestData.requests
                .slice()
                .reverse()
                .slice(0, 5);

        latestRequests.forEach(req => {

            activityList.innerHTML += `

                <li>

                    Student
                    ${req.rollNo}

                    requested room change

                    (${req.currentRoom}
                    →
                    ${req.desiredRoom})

                    <strong>
                        [${req.status}]
                    </strong>

                </li>

            `;

        });

    }

    catch(error) {

        console.log(error);

    }

}
// load initial data and setup auto-refresh

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStats();

        renderStatusChart();

        loadRequests();

        loadActivityFeed();

        renderOccupancyChart();

        loadQuickStats();

renderComplaintChart();
loadDashboardComplaints();

        setInterval(() => {

            loadStats();

            renderStatusChart();

            loadRequests();

               loadQuickStats();

            loadActivityFeed();

            renderOccupancyChart();

            renderComplaintChart();
            loadDashboardComplaints();


        }, 2000);

    }
);

      