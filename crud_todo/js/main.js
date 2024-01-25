const todoForm = document.getElementById('todoForm');

// todoListProgress
const todoListProgress = document.getElementById('todoListProgress');

// todoListDone 
const todoListDone = document.getElementById('todoListDone');

// Crud api for urlBase
const urlBase = '794fac064e5340bd95c494a3c006adb2';

setInterval(() => {
    const token = localStorage.getItem('token') || undefined;

    if (!token) {
        window.location.href = '../auth.html';
    }
}, 200);


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
                    body: JSON.stringify(data)
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
            try {
                const response = await fetch(url, {
                    method: crud,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: "no-cors"
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to Get request");
                }

                return result;
            }
            catch (err) {
                console.log(err.message);
            }
            break;

        case 'DELETE':
            break;
    }
}

function renderEl(where, data) {
    switch (where) {
        case 'progress': {
            todoListDone.innerHTML = "";
            todoListProgress.innerHTML = "";

            const tasks = data.filter(task => task.userId == localStorage.getItem('token'));

            tasks.forEach((tasks, index) => {
                const { task, dataTime, isDone, _id } = tasks;
                const template = `
                    <tr class="border-2" ondblclick="todoListisDone('${_id}')">
                        <td class="py-5 px-3">${index + 1}</td>
                        <td class="w-[400px]">${task}</td>
                        <td class="text-center">${dataTime[0]} ${dataTime[1]}</td>
                        <td class="text-center">${isDone ? "Done" : "in process"}</td>
                        <td class="pr-3 text-right">
                            <button type="button"
                                class="inline-block rounded border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-info-600 focus:border-info-600 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                data-te-ripple-init>
                                Edit
                            </button>

                            <button type="button"
                                class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                data-te-ripple-init>
                                Delete
                            </button>
                        </td>
                    </tr>
                `
                isDone ? todoListDone.innerHTML += template : todoListProgress.innerHTML += template;
            });
            break;
        }
    }
}

async function todoListisDone(id) {
    console.log(id);

    const res = await universalFetch("GET", `https://crudcrud.com/api/${urlBase}/todolist/${id}`);
    console.log(res);
    const data = {
        task: res.task,
        dataTime: res.dataTime,
        isDone: res.isDone,
        userId: res.userId,
        _id: res._id
    }

    data.isDone = true;
    console.log(data);

    universalFetch("PUT", `https://crudcrud.com/api/${urlBase}/todolist/${data._id}`, data).then(res => {
        console.log(res);
        alert("Done is successfully!");
        universalFetch("GET", `https://crudcrud.com/api/${urlBase}/todolist`)
            .then(data => {
                renderEl('progress', data);
            })
    }).catch(err => {
        console.log(err);
    })
}

// All todo list rendering
universalFetch("GET", `https://crudcrud.com/api/${urlBase}/todolist`)
    .then(res => {
        renderEl('progress', res);
    }).catch(err => {
        console.log(err);
    })

// Form submission add todo task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let task = e.target[0];
    let dataTime = e.target[1];
    let userId = localStorage.getItem('token');

    const data = {
        task: task.value,
        dataTime: dataTime.value.split('T'),
        isDone: false,
        userId
    }

    universalFetch("POST", `https://crudcrud.com/api/${urlBase}/todolist`, data)
        .then(res => {

            universalFetch("GET", `https://crudcrud.com/api/${urlBase}/todolist`)
                .then(data => {
                    renderEl('progress', data);
                })

        }).catch(err => {
            console.log(err);
        });
})