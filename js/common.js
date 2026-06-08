// Role management
function getRole() {
    return localStorage.getItem("role") || "student";
}

function setRole(role) {
    localStorage.setItem("role", role);
}

// Protect admin pages
function protectAdminPage() {
    const role = getRole();
    if (role !== "admin") {
        alert("Access Denied");
        window.location.href = "../sign_in.html";
    }
}

