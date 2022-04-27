const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    active: Boolean,
    avatar: String,
    email: {
        type: String,
        unique: true,
    },
    lastname: String,
    name: String,
    password: String,
    role: String,
});

module.exports = model('User', UserSchema);