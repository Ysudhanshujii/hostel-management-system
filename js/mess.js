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
async function loadMenu() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/mess"
            );

        const data =
            await response.json();

        const table =
            document.getElementById(
                "weeklyMenu"
            );

        table.innerHTML = "";

        data.menu.forEach(item => {

            table.innerHTML += `

                <tr>

                    <td>${item.day}</td>

                    <td>${item.breakfast}</td>

                    <td>${item.lunch}</td>

                    <td>${item.dinner}</td>

                </tr>

            `;

        });

    }

    catch(error) {

        console.log(error);

    }

}
window.submitFeedback = async function() {

    try {

        const rating =
            document.getElementById("rating").value;

        const comment =
            document.getElementById("comment").value;

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/feedback",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        rating,
                        comment
                    })
                }
            );

        alert("Feedback Submitted");

        loadFeedback();

    }

    catch(error) {

        console.log(error);

    }

};
async function loadFeedback() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/feedback"
            );

        const data =
            await response.json();

        const container =
            document.getElementById(
                "feedbackList"
            );

        container.innerHTML = "";

        data.feedbacks.forEach(
            feedback => {

            container.innerHTML += `

                <div class="feedback-item">

                    <p>

                        ${feedback.comment}

                    </p>

                    <span>

                        Rating:
                        ${feedback.rating}/5

                    </span>

                </div>

            `;

        });

    }

    catch(error) {

        console.log(error);

    }

}

loadFeedback();
loadMenu();
