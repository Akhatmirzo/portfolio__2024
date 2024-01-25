const userLists = document.getElementById('userLists');
const postModalBody = document.getElementById('post_modal-body');
const commentModalBody = document.getElementById('commentModalBody');
const loading = document.querySelector('.loading');

loading.style.display = 'block';
// Get api for function
async function getDataApi(apiURL) {
    const response = await fetch(apiURL);
    const dataResult = response.json();

    return dataResult;
}

// Render data for function
function renderElements(where, datas, id) {
    switch (where) {
        case 'users':
            userLists.innerHTML = "";
            datas.forEach((data) => {
                const template = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <span>id: ${data.id}</span>
                            <h5 class="card-title">${data.name}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${data.phone}</h6>
                            <p class="card-text">${data.email}</p>
                            <button onclick="postIdRender(${data.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                More
                            </button>
                        </div>
                    </div>
                `
                userLists.innerHTML += template;
            });
            break;
        case 'posts':
            postModalBody.innerHTML = "";
            datas.forEach((data) => {
                const template = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <span>userId: ${data.userId}</span>
                                <span>Id: ${data.id}</span>
                            </div>
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.body}</p>
                            <button onclick="commentRender(${data.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Comments
                            </button>
                        </div>
                    </div>
                `
                if (id === data.userId) {
                    postModalBody.innerHTML += template;
                }
            });
            break;
        case 'comments':
            commentModalBody.innerHTML = "";
            datas.forEach((data) => {
                const template = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <span>postId: ${data.postId}</span>
                                <span>Id: ${data.id}</span>
                            </div>
                            <h5 class="card-title">${data.name}</h5>
                            <h6 class="card-title">${data.email}</h6>
                            <p class="card-text">${data.body}</p>
                        </div>
                    </div>
                `
                commentModalBody.innerHTML += template;
            });
            break;
    }
}

// Get user data and render user data
getDataApi("https://jsonplaceholder.typicode.com/users")
    .then((data) => {
        // Loading
        loading.style.display = "none";
        // Render user data
        renderElements("users", data);
    }).catch((error) => {
        console.log(error);
    });

// Get user post data and render post data
function postIdRender(id) {
    postModalBody.innerHTML = "";
    getDataApi("https://jsonplaceholder.typicode.com/posts")
        .then((data) => {
            // Render post data
            renderElements("posts", data, id);
        }).catch((error) => {
            console.log(error);
        })
}

function commentRender(id) {
    commentModalBody.innerHTML = "";
    getDataApi(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((data) => {
            // Render post data
            renderElements("comments", data);
        }).catch((error) => {
            console.log(error);
        })
}


