const { Schema, model } = require('mongoose');

const CourseSchema = Schema({
    coupon: String,
    idCourse: {
        type: Number,
        unique: true,
        required: true,
    },
    link: String,
    order: Number,
    price: Number,
});

module.exports = model('Course', CourseSchema);