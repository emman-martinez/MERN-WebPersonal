const { Schema, model } = require('mongoose');

const MenuSchema = Schema({
    active: Boolean,
    order: Number,
    title: String,
    url: String,
});

module.exports = model('Menu', MenuSchema);