const role =
localStorage.getItem(
    "role"
);

if (role === "admin") {

    alert(
        "Access Denied"
    );

    window.location.href =
    "../dashboard.html";

}
document.addEventListener("DOMContentLoaded", function () {
const role = localStorage.getItem("role");
// HIDE FORM FOR STUDENTS

const form = document.getElementById("roomChangeForm");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const request = {

            rollNo: document.getElementById("rollNo").value,

            currentRoom: document.getElementById("currentRoom").value,

            desiredRoom: document.getElementById("desiredRoom").value,

            reason: document.getElementById("reason").value
        };

        try {

            const response = await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/rooms/change-request",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(request)
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(data.message);

                form.reset();

                loadRequests();

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}
// LOAD CHANGE REQUESTS

async function loadRequests() {

    const requestList = document.getElementById("requestList");

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

    <p class="reason">
        ${request.reason}
    </p>

    <p class="request-role">

        ${
            role === "student"
            ? "Waiting for admin approval"
            : "Admin Management Panel"
        }

    </p>

   ${role === "admin" ? `

    ${request.status === "Pending" ? `

    <div class="actions">

        <button
            class="approve-btn"
            onclick="updateStatus(${request.id}, 'Approved')">

            Approve

        </button>

        <button
            class="reject-btn"
            onclick="updateStatus(${request.id}, 'Rejected')">

            Reject

        </button>

    </div>

    ` : ""}

` : ""}

 <p class="final-status ${request.status.toLowerCase()}">

    Request ${request.status}

</p>

</div>

`;

        });

    } catch (error) {

        console.error(error);

    }

}

// UPDATE REQUEST STATUS

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

        if (data.success) {

            alert(data.message);

            loadRequests();

        }

    } catch (error) {

        console.error(error);

    }

};

loadRequests();

// Auto refresh every 2 seconds
setInterval(loadRequests, 2000);
});