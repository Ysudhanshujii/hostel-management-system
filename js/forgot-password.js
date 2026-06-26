document
.getElementById("forgotForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const scholarNo =
        document.getElementById("scholar-no").value;

    try {

        const response =
            await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/auth/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        scholarNo
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

    }

    catch(error) {

        console.log(error);

        alert("Server Error");

    }

});