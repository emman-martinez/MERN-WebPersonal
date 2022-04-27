import { apiVersion, basePath } from './config';

function subscribeNewsletterApi(email) {
    const url = `${ basePath }/${ apiVersion }/newsletter/subscribe/${ email }`;
    const params = {
        method: 'POST',
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
                code: err.code,
                msg: err.msg,
                ok: false,
            };
        });
};

export {
    subscribeNewsletterApi,
};