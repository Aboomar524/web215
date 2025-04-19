document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error");

    if (username === "web215user" && password === "LetMeIn!") {
        // حفظ تسجيل الدخول في localStorage
        localStorage.setItem("isAuthenticated", "true");
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
});
