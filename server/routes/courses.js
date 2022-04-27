/*
    Rutas Courses / Courses
    host + /api/v1/Courses
*/
const { Router } = require('express');
const { addCourse, deleteCourse, getCourses, updateCourse }= require('../controllers/courses');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// C => Add Course
router.post('/add-course', validarJWT, addCourse);

// R => Get Courses
router.get('/get-courses', getCourses);

// U => Update Course
router.put('/update-course/:id', validarJWT, updateCourse);

// D => Delete Course
router.delete('/delete-course/:id', validarJWT, deleteCourse);

module.exports = router;