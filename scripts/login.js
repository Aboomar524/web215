document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error");

    const users = {
        "web215user": "LetMeIn!",
        "ahmad": "mypassword123",
        "testuser": "test123"
    };

    if (users[username] && users[username] === password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
