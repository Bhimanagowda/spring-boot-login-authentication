let allUsers = [];


// LOAD USERS

function getUsers() {

    fetch("/users")

        .then(response => response.json())

        .then(users => {

            allUsers = users;

            displayUsers(users);

        })

        .catch(error => {

            console.error(error);

        });
}


// DISPLAY USERS

function displayUsers(users) {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    users.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${user.id}</td>

            <td>${user.username}</td>

            <td>

                <button
                    class="view-button"
                    onclick="viewUser(${user.id})">
                    VIEW
                </button>

                <button
                    class="edit-button"
                    onclick="editUser(${user.id})">
                    EDIT
                </button>

                <button
                    class="delete-button"
                    onclick="deleteUser(${user.id})">
                    DELETE
                </button>

            </td>

        `;

        table.appendChild(row);

    });
}


// SEARCH USERS

function searchUsers() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchText)
    );

    displayUsers(filteredUsers);
}


// VIEW USER

function viewUser(id) {

    fetch(`/users/${id}`)

        .then(response => response.json())

        .then(user => {

            alert(
                "ID: " + user.id +
                "\nUsername: " + user.username
            );

        });

}


// EDIT USER

function editUser(id) {

    const username =
        prompt("Enter new username:");

    const password =
        prompt("Enter new password:");

    if (!username || !password) {
        return;
    }

    fetch(`/users/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(response => response.json())

    .then(user => {

        alert("User updated successfully");

        getUsers();

    });

}


// DELETE USER

function deleteUser(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    fetch(`/users/${id}`, {

        method: "DELETE"

    })

    .then(response => response.text())

    .then(message => {

        alert(message);

        getUsers();

    });

}


// LOAD USERS WHEN PAGE OPENS

getUsers();