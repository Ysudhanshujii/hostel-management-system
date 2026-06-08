document.addEventListener("DOMContentLoaded", function () {

//    ROLE CHECK


const role = localStorage.getItem("role");

const form = document.getElementById("allocationForm");


//    HIDE BUTTON FOR STUDENTS


const submitBtn =
    document.querySelector(
        '#allocationForm input[type="submit"]'
    );

if (role !== "admin") {

    alert("Only Admin Can Allocate Rooms");

    submitBtn.style.display = "none";

}

// aloocate room

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentId =
        document.getElementById("studentId").value;

    const roomNo =
        document.getElementById("roomNumber").value.trim();

    try {

        const response = await fetch(
            "http://localhost:3000/api/rooms/allocate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    studentId,
                    roomNo
                })

            }
        );

        const data = await response.json();

        alert(data.message);

        form.reset();

        loadRooms();

    } catch (error) {

        console.log(error);

    }

});

// load the all room

async function loadRooms() {

    const tableBody =
        document.getElementById("roomTableBody");

    if (!tableBody) return;

    try {

        const response = await fetch(
            "http://localhost:3000/api/rooms/all"
        );

        const data = await response.json();

        tableBody.innerHTML = "";

        data.rooms.forEach((room) => {

            const status =
                room.students.length >= room.capacity
                    ? "Occupied"
                    : "Available";

            const students =
                room.students.length > 0
                    ? room.students.join(", ")
                    : "Not Assigned";

            tableBody.innerHTML += `

                <tr>

                    <td>${room.roomNo}</td>

                    <td>${students}</td>

                    <td>${status}</td>

                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}
// initial load


loadRooms();

});