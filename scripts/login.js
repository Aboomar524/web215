// login.js
function login(event) {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "web215user" && pass === "LetMeIn!") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";
    } else {
        document.getElementById("error").innerText = "Invalid username or password.";
    }
}
function togglePassword() {
    const passField = document.getElementById("password");
    passField.type = passField.type === "password" ? "text" : "password";
}
document.getElementById("loginForm").addEventListener("submit", login);
document.getElementById("togglePassword").addEventListener("click", togglePassword);  