// Assuming your login form has id="loginForm"
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevents the default form submission behavior

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation (optional)
    if (!username || !password) {
        alert("Please fill out both fields!");
        return;
    }

    // Send login data to server via fetch API (AJAX)
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard';  // Redirect to the dashboard if login is successful
            } else {
                alert("Invalid username or password!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Something went wrong!");
        });
});
