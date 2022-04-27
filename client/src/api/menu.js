import { apiVersion, basePath } from './config';

// Get Menus
function getMenuApi(token) {
    const url = `${ basePath }/${ apiVersion }/menu/get-menus`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
};


// Update Menus
function updateMenuApi(token, menuId, data){
    const url = `${ basePath }/${ apiVersion }/menu/update-menu/${ menuId }`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify(data),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
};

// Activate Menu
function activateMenuApi(token, menuId, status){
    const url = `${ basePath }/${ apiVersion }/menu/activate-menu/${ menuId }`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify({ active: status }),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
};

// Add Menu 
function addMenuApi(token, menu) {
    const url = `${ basePath }/${ apiVersion }/menu/add-menu`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify(menu),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
}

// Delete Menu
function deleteMenuApi(token, menuId) {
    const url = `${ basePath }/${ apiVersion }/menu/delete-menu/${ menuId }`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
}

export {
    activateMenuApi,
    addMenuApi,
    deleteMenuApi,
    getMenuApi,
    updateMenuApi,
};