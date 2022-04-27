import { apiVersion, basePath } from './config';

// Add Course 
function addCourseApi(token, course) {
    const url = `${ basePath }/${ apiVersion }/courses/add-course`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token,
        },
        body: JSON.stringify(course),
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

// Delete Course
function deleteCourseApi(token, courseId) {
    const url = `${ basePath }/${ apiVersion }/courses/delete-course/${ courseId }`;
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

// Get Udemy Courses
function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${ id }/`;
    const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + coursesParams;

    return fetch(url)
            .then( async response => {
                return {
                    code: response.status,
                    data: await response.json(),
                }
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            });
}

// Get Courses
function getCoursesApi() {
    const url = `${ basePath }/${ apiVersion }/courses/get-courses`;

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

// Update Courses
function updateCoursesApi(token, courseId, data){
    const url = `${ basePath }/${ apiVersion }/courses/update-course/${ courseId }`;
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
    addCourseApi,
    deleteCourseApi,
    getCourseDataUdemyApi,
    getCoursesApi,
    updateCoursesApi,
};