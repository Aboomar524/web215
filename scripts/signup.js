// Assuming your signup form has id="signupForm"
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevents the default form submission behavior

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic validation (optional)
    if (!username || !password || !confirmPassword) {
        alert("Please fill out all fields!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Send signup data to server via fetch API (AJAX)
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Account created successfully! Please login.");
                window.location.href = '/login';  // Redirect to login after successful signup
            } else {
                alert("Error creating account!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Something went wrong!");
        });
});
