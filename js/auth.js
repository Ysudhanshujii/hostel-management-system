document.addEventListener("DOMContentLoaded", function () {

//    ADMIN LOGIN


const adminForm = document.getElementById("adminLoginForm");

if (adminForm) {

    adminForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value;

        const password = document.getElementById("password").value;

        try {

            const response = await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/auth/admin-login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

           if (data.success) {

    localStorage.setItem("role", "admin");

    alert(data.message);

    window.location.href = "dashboard.html";

} else {

    alert(data.message);

}

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    });

}

// STUDENT REGISTRATION

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const student = {

            studentName: document.getElementById("studentName").value,

            fatherName: document.getElementById("fatherName").value,

            rollNo: document.getElementById("rollNo").value,

            fatherphone: document.getElementById("fatherphone").value,

            email: document.getElementById("email").value,

            studentphone: document.getElementById("studentphone").value,
            
             password :document.getElementById("password").value,

            address: document.getElementById("address").value

        };

        try {

            const response =   await fetch(
                        "https://hostel-management-system-h3xb.onrender.com/api/auth/register",
                        {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (data.success) {

                alert(data.message);

                window.location.href = "sign_in.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Registration Failed");

        }

    });

}

// STUDENT LOGIN

const studentLoginForm = document.getElementById("studentLoginForm");

if (studentLoginForm) {

    studentLoginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const scholar = document.getElementById("Scholar").value;

        const password = document.getElementById("password").value;

        try {

            const response = await fetch(
                "https://hostel-management-system-h3xb.onrender.com/api/auth/student-login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        scholar,
                        password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

               localStorage.setItem("role", "student");

                localStorage.setItem(
                    "studentData",
                    JSON.stringify(data.student)
                );

                alert(data.message);

                window.location.href =
                    "services/home_service.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Login Failed");

        }

    });

}

});