/******************************************************************************
 *                          Fetch and display computers
 ******************************************************************************/

displayComputers();


function displayComputers() {
    httpGet('/api/computers/all')
        .then(response => response.json())
        .then((response) => {
            const allComputers = response.computers
            // Empty the anchor
            var allComputersAnchor = document.getElementById('all-computers-anchor');
            allComputersAnchor.innerHTML = '';
            // Append computers to anchor
            allComputers.forEach((computer) => {
                allComputersAnchor.innerHTML += getComputerDisplayEle(computer);
            });
        });
};


function getComputerDisplayEle(computer) {
    return `<div class="computer-display-ele">

        <div class="normal-view">
            <div>Name: ${computer.name}</div>
            <div>description: ${computer.description}</div>
            <button class="edit-computer-btn" data-computer-id="${computer.id}">
                Edit
            </button>
            <button class="delete-computer-btn" data-computer-id="${computer.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${computer.name}">
            </div>
            <div>
                Description: <input class="description-edit-input" value="${computer.description}">
            </div>
            <button class="submit-edit-btn" data-computer-id="${computer.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-computer-id="${computer.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete computers
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-computer-btn')) {
        addComputer();
    } else if (ele.matches('.edit-computer-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-computer-btn')) {
        deleteComputer(ele);
    }
}, false)


function addComputer() {
    var nameInput = document.getElementById('name-input');
    var descriptionInput = document.getElementById('description-input');
    var data = {
        computer: {
            name: nameInput.value,
            description: descriptionInput.value
        },
    };
    httpPost('/api/computers/add', data)
        .then(() => {
            displayComputers();
        })
}


function showEditView(computerEle) {
    var normalView = computerEle.getElementsByClassName('normal-view')[0];
    var editView = computerEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(computerEle) {
    var normalView = computerEle.getElementsByClassName('normal-view')[0];
    var editView = computerEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    var computerEle = ele.parentNode.parentNode;
    var nameInput = computerEle.getElementsByClassName('name-edit-input')[0];
    var descriptionInput = computerEle.getElementsByClassName('description-edit-input')[0];
    var id = ele.getAttribute('data-computer-id');
    var data = {
        computer: {
            name: nameInput.value,
            description: descriptionInput.value,
            id: id
        }
    };
	httpPut('/api/computers/update', data)
        .then(() => {
            displayComputers();
        })
}


function deleteComputer(ele) {
    var id = ele.getAttribute('data-computer-id');
	httpDelete('/api/computers/delete/' + id)
        .then(() => {
            displayComputers();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

