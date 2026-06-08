document
.getElementById("forgotForm")
.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();

        const email =
        document.getElementById(
            "email"
        ).value;

        alert(
            "Password reset request submitted for: "
            + email
        );

    }
);