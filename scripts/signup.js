// Handle the signup form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Basic form validation
    if (!newUsername || !newPassword || !confirmPassword) {
        alert("Please fill out all fields!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Send the signup data to the server using fetch
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword
        })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Account created successfully! Please log in.");
                window.location.href = '/login';  // Redirect to the login page
            } else {
                alert("Error creating account!");
            }
        })
        .catch((error) => {  // Detailed error logging
            console.error('Error details:', error);
            alert("Something went wrong! Check the console for details.");
        });
});
