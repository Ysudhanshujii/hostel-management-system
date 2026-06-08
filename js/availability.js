document.addEventListener("DOMContentLoaded", function () {

    async function loadAvailability() {

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

                tableBody.innerHTML += `

                    <tr>

                        <td>${room.roomNo}</td>

                        <td>${room.type}</td>

                        <td>${room.capacity}</td>

                        <td>${room.students.length}</td>

                        <td>
                            ${room.capacity - room.students.length}
                        </td>

                        <td>
                            ${
                                room.students.length > 0
                                ? room.students.join(", ")
                                : "-"
                            }
                        </td>

                        <td>

                            <span class="
                                ${
                                    room.students.length >= room.capacity
                                    ? "occupied"
                                    : "available"
                                }
                            ">

                                ${
                                    room.students.length >= room.capacity
                                    ? "Full"
                                    : "Available"
                                }

                            </span>

                        </td>

                    </tr>

                `;

            });

        } catch (error) {

            console.error(error);

        }

    }

    loadAvailability();

});