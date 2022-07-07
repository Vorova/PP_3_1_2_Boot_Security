const API = "/admin/api"

async function showEditModal(id) {
    let user = await getUser(id);

    document.getElementById("editId").value = user.id;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editEmail").value = user.email;

    let select = document.getElementById("editRoles");

    // ��������� ���� �����
    for (let i = 0; i < select.length; i++) {
        select[i].selected = false;
    }

    // �������� ����������� ����
    for (let j = 0; j < user.roles.length; j++) {
        for (let i = 0; i < select.length; i++) {
            if (select[i].value == user.roles[j].id) {
                select[i].selected = true;
            }
        }
    }
}

async function showDeleteModal(id) {
    let user = await getUser(id);

    document.getElementById("deleteId").value = user.id;
    document.getElementById("deleteUsername").value = user.username;
    document.getElementById("deleteEmail").value = user.email;

    let select = document.getElementById("deleteRoles");

    // �������� ����������� ����
    for (let j = 0; j < user.roles.length; j++) {
        for (let i = 0; i < select.length; i++) {
            if (select[i].value == user.roles[j].id) {
                select[i].selected = true;
            }
        }
    }
}

async function getUser(id) {
    try {
        let response = await fetch(API + "/getUser/" + id);
        return await response.json();
    } catch (error) {
        console.log(error);
        debugger
    }
}

async function editUser() {
    let editForm = document.getElementById("editForm");
    let formData = new FormData(editForm);

    let user = {
        id: formData.get('id'),
        username: formData.get('username'),
        email: formData.get('email'),
        roles: Array.from(document.getElementById("editRoles"))
            .filter(option => option.selected)
            .map(option => ({id: option.value}))
    }

    fetch(API + "/updateUser", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(() => {
        location.reload();
    })

    // todo ������� ��������� ����
    // todo �������� ������ � ������ � �������������
}

async function deleteUser() {
    let deleteForm = document.getElementById("deleteForm");
    let formData = new FormData(deleteForm);

    let id = formData.get('id')

    fetch(API + "/deleteUser", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(() => {
        location.reload();
    })

    // todo ������� ��������� ����
    // todo �������� ������ � ������� �������������
}