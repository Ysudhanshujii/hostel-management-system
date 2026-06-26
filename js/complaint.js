
    document.addEventListener("DOMContentLoaded", function () {

    const role = localStorage.getItem("role");

    if (role === "admin") {

        const complaintForm =
            document.getElementById("complaintForm");

        if (complaintForm) {

            complaintForm.style.display = "none";

        }

    }

// SUBMIT COMPLAINT

const complaintForm = document.getElementById("complaintForm");

if (complaintForm) {

    complaintForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const complaint = {

            rollNo: document.getElementById("rollNo").value,

            roomNo: document.getElementById("roomNo").value,

            category: document.getElementById("category").value,

            description: document.getElementById("description").value

        };

        try {

            const response = await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/complaints",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(complaint)
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(data.message);

                complaintForm.reset();

                loadComplaints();

            } else {

                alert("Complaint Failed");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// LOAD COMPLAINTS

async function loadComplaints() {

    const complaintList = document.getElementById("complaintList");

    if (!complaintList) return;

    try {

        const response = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/complaints"
        );

        const data = await response.json();

        complaintList.innerHTML = "";

        data.complaints.forEach((complaint) => {

            complaintList.innerHTML += `

                <div class="complaint-card">

                    <h3>${complaint.category}</h3>

                    <p><strong>Roll:</strong> ${complaint.rollNo}</p>

                    <p><strong>Room:</strong> ${complaint.roomNo}</p>

                    <p>${complaint.description}</p>
<p>
    <strong>Status:</strong>

    <span class="status">
        ${complaint.status}
    </span>
</p>

${localStorage.getItem("role") === "admin"
&& complaint.status === "Pending" ? `

<button
    class="resolve-btn"
   onclick="resolveComplaint('${complaint._id}')"

    Resolve Complaint

</button>

` : ""}

${complaint.status === "Resolved" ? `

<p style="color:green;font-weight:bold;">
    ✓ Complaint Resolved
</p>

` : ""}

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}


loadComplaints();

});