async function loadFeedback() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/feedback"
            );

        const data =
            await response.json();
            document.getElementById(
    "totalFeedback"
).innerText =
data.feedbacks.length;

        const feedbackList =
            document.getElementById(
                "feedbackList"
            );

        feedbackList.innerHTML = "";

        data.feedbacks.forEach(
            feedback => {

                feedbackList.innerHTML += `

                    <div class="feedback-item">

                        <p>

                            ${feedback.comment}

                        </p>

                        <span>

                            Rating:
                            ${feedback.rating}/5 ⭐

                        </span>

                    </div>

                `;

            });

    }

    catch(error) {

        console.log(error);

    }

}

window.saveMenu = async function() {

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/mess",
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        day:
                        document.getElementById(
                            "day"
                        ).value,

                        breakfast:
                        document.getElementById(
                            "breakfast"
                        ).value,

                        lunch:
                        document.getElementById(
                            "lunch"
                        ).value,

                        dinner:
                        document.getElementById(
                            "dinner"
                        ).value

                    })

                }
            );

        const data =
            await response.json();

        alert(
            "Menu Updated Successfully"
        );

    }

    catch(error) {

        console.log(error);

    }

};
loadFeedback();