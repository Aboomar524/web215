function fetchUsers() {
    fetch('/getUsers')
        .then((response) => response.json())
        .then((data) => {
            if (data.users) {
                const userList = document.getElementById('userList');
                userList.innerHTML = '';
                data.users.forEach((user) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${user.username}`;
                    userList.appendChild(listItem);
                });
            }
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchUsers);
