// This function will be called to populate the user list dynamically
function fetchUsers() {
    fetch('/getUsers')  // Endpoint to get users data from the backend
        .then(response => response.json())
        .then(data => {
            if (data.users) {
                const userList = document.getElementById('userList');
                userList.innerHTML = '';  // Clear the list before adding new users
                data.users.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${user.username}`;
                    userList.appendChild(listItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
