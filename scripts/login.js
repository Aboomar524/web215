// Initialize default user if none exists
if (!localStorage.getItem("users")) {
    const defaultUsers = {
        "web215user": "LetMeIn!"
    };
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error");

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});