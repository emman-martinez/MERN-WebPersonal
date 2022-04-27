const { Schema, model } = require('mongoose');

const NewsletterSchema = Schema({
    email: {
        type: String,
        unique: true,
    }
});

module.exports = model('Newsletter', NewsletterSchema);