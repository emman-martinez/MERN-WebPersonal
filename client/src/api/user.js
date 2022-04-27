import { apiVersion, basePath } from './config';
import { ACCESS_TOKEN } from '../utils/constants';

function getUsers(token) {
    const url = `${ basePath }/${ apiVersion }/users`;
    const params = {
        method: 'GET',
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
};

function getUsersActive(token, status) {
    const statusUser = `active=${ status }`;
    const url = `${ basePath }/${ apiVersion }/users/active?${ statusUser }`;
    const params = {
        method: 'GET',
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
};

function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
};

function signInApi(data) {
    const url = `${ basePath }/${ apiVersion }/auth/sign-in`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
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
};

function signUpApi(data) {
    const url = `${ basePath }/${ apiVersion }/auth/sign-up`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
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
};

function tokenRenew() {
    const url = `${ basePath }/${ apiVersion }/auth/renew`;
    const token = localStorage.getItem(ACCESS_TOKEN) || '';
    const params =  {
        method: 'GET',
        headers: {
            'x-token': token ? token : null,
        }
    }

    return fetch(url, params)
            .then(response => {
                return response.json();
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log({ err });
                return {
                    ok: false,
                    msg: err.msg,
                };
            });
};

function uploadAvatarApi(token, avatar, userId) {
    const url = `${ basePath }/${ apiVersion }/users/upload-avatar/${ userId }`;
    const formData = new FormData();
    formData.append('avatar', avatar, avatar.name);

    const params = {
        method: 'PUT',
        body: formData,
        headers: {
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

function getAvatarApi(avatarName) {
    const url = `${ basePath }/${ apiVersion }/users/get-avatar/${ avatarName }`;

    return fetch(url)
        .then(response => {
            return response.url;
        })
        .catch(err => {
            return {
                ok: false,
                msg: err.msg,
            };
        });
}

function updateUserApi(token, user, userId) {
    const url = `${ basePath }/${ apiVersion }/users/update-user/${ userId }`;
    const params = {
        method: 'PUT',
        body: JSON.stringify(user),
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

function activateUserApi(token, userId, status) {
    const url = `${ basePath }/${ apiVersion }/users/activate-user/${ userId }`;
    const params = {
        method: 'PUT',
        body: JSON.stringify({
            active: status,
        }),
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

function deleteUserApi(token, userId) {
    const url = `${ basePath }/${ apiVersion }/users/delete-user/${ userId }`;
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

function signUpAdminApi(token, data) {
    const url = `${ basePath }/${ apiVersion }/users/sign-up-admin`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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
};

export {
    activateUserApi,
    deleteUserApi,
    getAvatarApi,
    getUsers,
    getUsersActive,
    logout,
    signInApi,
    signUpAdminApi,
    signUpApi,
    tokenRenew,
    updateUserApi,
    uploadAvatarApi,
};