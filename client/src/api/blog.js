import { apiVersion, basePath } from './config';

// Add Post 
function addPostApi(token, post) {
    const url = `${ basePath }/${ apiVersion }/posts/add-post`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify(post),
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

// Delete Post
function deletePostApi(token, postId) {
    const url = `${ basePath }/${ apiVersion }/posts/delete-post/${ postId }`;
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

// Get Post
function getPostApi(urlPost) {
    const url = `${ basePath }/${ apiVersion }/posts/get-post/${ urlPost }`;

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

// Get Posts
function getPostsApi(limit, page) {
    const url = `${ basePath }/${ apiVersion }/posts/get-posts?limit=${ limit }&page=${ page }`;

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


// Update Post
function updatePostApi(token, postId, data){
    const url = `${ basePath }/${ apiVersion }/posts/update-post/${ postId }`;
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

export {
    addPostApi,
    deletePostApi,
    getPostApi,
    getPostsApi,
    updatePostApi,
};