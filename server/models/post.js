const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = Schema({
    date: Date,
    description: String,
    title: String,
    url: {
        type: String,
        unique: true,
    },
});

PostSchema.plugin(mongoosePaginate);

module.exports = model('Post', PostSchema);