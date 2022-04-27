const { response } = require("express");
const Course = require('../models/courses');

const addCourse = (req, res = response) => {
    const body = req.body;
    const course = new Course(body);
    course.order = 1000;

    course.save((err, courseStored) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor',
                ok: false,
            });
        } else {
            if (!courseStored) {
                res.status(400).json({
                    code: 400,
                    msg: 'No se ha podido crear el curso.',
                    ok: false,
                });
            } else {
                res.status(200).json({
                    code: 200,
                    msg: 'Curso creado correctamente.',
                    ok: true,
                });
            }
        }
    });
};

const deleteCourse = async(req, res = response) => {
    const { id } = req.params;

    await Course.findByIdAndRemove(id, (err, courseDeleted) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!courseDeleted) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado el curso.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    msg: 'El curso ha sido eliminado correctamente.',
                    ok: true,
                }); 
            }
        }
    });
}

const getCourses = async(req, res = response) => {
    await Course.find()
    .sort({ order: 'asc' })
    .exec((err, courseStored) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!courseStored) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado ningún curso.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    courses: courseStored,
                    ok: true,
                });
            }
        }
    });
};

// Update Menus
const updateCourse = async(req, res = response) => {
    const courseData = req.body;
    const id = req.params.id;

    await Course.findByIdAndUpdate(id, courseData, (err, courseUpdate) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!courseUpdate) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado ningún curso.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    msg: 'Curso actualizado correctamente',
                    ok: true,
                });
            }
        }
    });
};

module.exports = {
    addCourse,
    deleteCourse,
    getCourses,
    updateCourse,
};