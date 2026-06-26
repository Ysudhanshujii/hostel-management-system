
const regForm =
document.getElementById("registrationForm");

if (regForm) {

    regForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

           const student = {

    studentName:
        document.getElementById("studentName").value,

    fatherName:
        document.getElementById("fatherName").value,

    rollNo:
        document.getElementById("rollNo").value,

    fatherphone:
        document.getElementById("fatherphone").value,

    email:
        document.getElementById("email").value,

    studentphone:
        document.getElementById("studentphone").value,

    password:
        document.getElementById("password").value,

    address:
        document.getElementById("address").value

};
            try {

                const response =
                    await fetch(
                        "https://hostel-management-system-h3xb.onrender.com/api/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                "application/json"
                            },

                            body: JSON.stringify(student)
                        }
                    );

                const data =
                    await response.json();

                alert(data.message);

                if (data.success) {

                    window.location.href =
                        "sign_in.html";

                }

            }

            catch(error) {

                console.log(error);

                alert("Server Error");

            }

        }
    );

}