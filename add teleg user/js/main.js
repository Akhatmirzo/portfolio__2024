const userBtn = document.getElementById('userBtn');
const tableBody = document.getElementById('tableBody');
let users = [
    {
        id: 0,
        fullName: "Akhatmirzo Umarov",
        username: "akhatmirzo",
    },
    {
        id: 1,
        fullName: "Jonatan Smith",
        username: "smithing",
    },
    {
        id: 2,
        fullName: "Merkhub Bar",
        username: "barmering",
    }
];
renderUsers();

function AddTgUser() {
    const fullNameInput = document.getElementById('fullNameInput');
    const userNameInput = document.getElementById('userNameInput');

    const user = {
        id: users.length,
        fullName: fullNameInput.value,
        username: userNameInput.value,
    };

    users.push(user);

    renderUsers();
    fullNameInput.value = '';
    userNameInput.value = '';
}

userBtn.onclick = AddTgUser;

function renderUsers() {
    tableBody.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        const template = `
            <tr>
                <th scope="row">${i+1}</th>
                <th scope="row">${users[i].fullName}</th>
                <th scope="row">@${users[i].username}</th>
                <th scope="row">
                    <a href="https://t.me/${users[i].username}">@${users[i].username}</a>
                </th>
                <th>
                    <button class="btn btn-warning" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onclick="editUser(${users[i].id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser(${users[i].id})">Delete</button>
                </th>
            </tr>
        `;

        tableBody.innerHTML += template;
    }
}

function editUser(id) {
    const editUsername = document.getElementById('editUsername');
    const editUserTgName = document.getElementById('editUserTgName');
    const editSaveBtn = document.getElementById('editSaveBtn');

    editUsername.value = users[id].fullName;
    editUserTgName.value = users[id].username;

    editSaveBtn.addEventListener('click', () => {
        users[id].fullName = editUsername.value;
        users[id].username = editUserTgName.value;

        renderUsers();
    })
}

function deleteUser(id) {
    const newUsers = [];

    for(let i = 0; i < users.length; i++) {
        if(id == users[i].id) {
            continue;
        }else {
            newUsers.push(users[i])
        }
    }

    users = newUsers;
    renderUsers();
} 