<script>
    function fetchUsers() {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (users.length === 0) {
      const listItem = document.createElement('li');
    listItem.textContent = "No users registered.";
    userList.appendChild(listItem);
    } else {
        users.forEach((user) => {
            const listItem = document.createElement('li');
            listItem.textContent = user.username;
            userList.appendChild(listItem);
        });
    }
  }

    document.addEventListener('DOMContentLoaded', fetchUsers);
</script>
