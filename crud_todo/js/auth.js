const loginWrap = document.getElementById('loginWrap');
const registerWrap = document.getElementById('registerWrap');

// Login form
const loginForm = document.getElementById('loginForm');
// Register form
const registerForm = document.getElementById('registerForm');

// Crud api for urlBase
const urlBase = 'acfd394727f44660af385901bacb0b09';

setInterval(() => {
    const token = localStorage.getItem('token') || undefined;
    if (token) {
        window.location.href = '../index.html';
    }
}, 200);

function wrapperVisible(where) {

    switch (where) {
        case 'register':
            loginWrap.style.display = 'none';
            registerWrap.style.display = 'flex';
            break;
        case 'login':
            registerWrap.style.display = 'none';
            loginWrap.style.display = 'flex';
            break;
    }
}

// https://crudcrud.com/api/acfd394727f44660af385901bacb0b09
// Universal Fetch function
async function universalFetch(crud, url, data) {
    switch (crud) {
        case 'POST':
            try {
                const response = await fetch(url, {
                    method: crud,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: "no-cors"
                });

                const result = response.json();

                if (!response.ok) {
                    throw new Error("Failed to Get request");
                }

                return result;
            }
            catch (err) {
                console.log(err.message);
            }
            break;

        case 'GET': {
            try {
                const response = await fetch(url);
                const result = response.json();

                if (!response.ok) {
                    throw new Error("Failed to Get request");
                }
                return result;
            }
            catch (err) {
                console.log(err.message);
            }
            break;
        }
        case 'PUT':
            break;

        case 'DELETE':
            break;
    }
}

// https://crudcrud.com/api/e3ae0b76f9124b0c8fdb008f1ad42200/users
// Login form submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = e.target[0];
    let password = e.target[1];

    const data = {
        email: email.value,
        password: password.value
    }

    universalFetch("GET", `https://crudcrud.com/api/${urlBase}/users`)
        .then(res => {

            let isUserVrify = null;
            res.map(user => {
                if (user.email === data.email && user.password === data.password) {
                    isUserVrify = user._id;
                }
            })

            if (isUserVrify) {
                alert("Login successfully!")
                localStorage.setItem("token", isUserVrify)

            } else {
                alert("Foydalanuvchi mavjud emas!");
            }

            email.value = "";
            password.value = "";
        }).catch(err => {
            console.log(err);
        })
})

// Register form submit
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = e.target[0];
    let password = e.target[1];

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (specialChars.test(password.value) && password.value.length > 4) {
        const data = {
            email: email.value,
            password: password.value,
        }

        universalFetch("GET", `https://crudcrud.com/api/${urlBase}/users`)
            .then(users => {
                let isRegistered = false;
                for (const user of users) {
                    if (user?.email === data?.email) {
                        isRegistered = true;
                        break;
                    }
                }

                if (!isRegistered) {
                    universalFetch("POST", `https://crudcrud.com/api/${urlBase}/users`, data)
                        .then(res => {

                            if (res) {
                                alert("Register successfully!")
                                localStorage.setItem("token", res._id)
                            }

                        }).catch(err => {
                            console.log(err + ": " + "Register failed!");
                        })
                } else {
                    alert("Bu foydalanuvchi mavjud!");
                }

                email.value = "";
                password.value = "";
            }).catch(err => {
                console.log(err);
            })
    }else {
        alert("Password must have special character or length < 4");
    }


})