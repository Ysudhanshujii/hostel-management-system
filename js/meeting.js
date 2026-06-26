document.addEventListener("DOMContentLoaded", function () {



const role = localStorage.getItem("role");

// HIDE ADMIN PANEL FOR STUDENTS

if (role !== "admin") {

    const adminPanel =
        document.getElementById("admin-panel");

    if (adminPanel) {

        adminPanel.style.display = "none";

    }

}

// LOAD ANNOUNCEMENTS

async function loadAnnouncements() {

    const announcementList =
        document.getElementById("announcementList");

    if (!announcementList) return;

    try {

        const response = await fetch(
            "https://hostel-management-system-h3xb.onrender.com/api/meetings"
        );

        const data = await response.json();

        announcementList.innerHTML = "";

        data.announcements.forEach((announcement) => {

            const pointsHTML =
                announcement.points.map(point => `
                    <li>${point}</li>
                `).join("");

            announcementList.innerHTML += `

                <div class="announcement-card">

                    <h3>
                        ${announcement.subject}
                    </h3>

                    <ul>
                        ${pointsHTML}
                    </ul>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}
// SAVE ANNOUNCEMENT

const saveBtn =
    document.getElementById("saveAnnouncement");

if (saveBtn) {

    saveBtn.addEventListener("click", async function () {

        const subject =
            document.getElementById("admin-subject").value;

        const pointsText =
            document.getElementById("admin-points").value;

        const points =
            pointsText
                .split("\n")
                .filter(p => p.trim() !== "");

        try {

            const response = await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/meetings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        subject,
                        points
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(data.message);

                document.getElementById(
                    "admin-subject"
                ).value = "";

                document.getElementById(
                    "admin-points"
                ).value = "";

                loadAnnouncements();

            }

        } catch (error) {

            console.error(error);

        }

    });

}

// INITIAL LOAD

loadAnnouncements();

});