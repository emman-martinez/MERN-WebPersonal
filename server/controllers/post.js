const { response } = require("express");
const Post = require('../models/post');

// Add Post
const addPost = (req, res = response) => {
    const body = req.body;
    const post = new Post(body);

    post.save((err, postStored) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor',
                ok: false,
            });
        } else {
            if (!postStored) {
                res.status(400).json({
                    code: 400,
                    msg: 'No se ha podido crear el post.',
                    ok: false,
                });
            } else {
                res.status(200).json({
                    code: 200,
                    msg: 'Post creado correctamente.',
                    ok: true,
                });
            }
        }
    });
};

// Delete Post
const deletePost = async(req, res = response) => {
    const { id } = req.params;

    await Post.findByIdAndRemove(id, (err, postDeleted) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!postDeleted) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado el post.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    msg: 'El post ha sido eliminado correctamente.',
                    ok: true,
                }); 
            }
        }
    });
}

// Get Post
const getPost = async(req, res = response) => {
    const { url } = req.params;

    await Post.findOne({ url }, (err, postStored) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!postStored) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado el post.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    post: postStored,
                    ok: true,
                }); 
            }
        }
    });
    

};

// Get Posts
const getPosts = async(req, res = response) => {
    const { limit = 10, page = 1 } = req.query;

    const options = {
        limit: parseInt(limit),
        page,
        sort: { date: 'desc' },
    };

    Post.paginate({}, options, (err, postStored) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!postStored) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado ningún post.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    posts: postStored,
                    ok: true,
                });
            }
        }
    });

};

// Update Post
const updatePost = async(req, res = response) => {
    const postData = req.body;
    const { id } = req.params;

    await Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
        if (err) {
            res.status(500).json({
                code: 500,
                msg: 'Error del servidor.',
                ok: false,
            });
        } else {
            if (!postUpdate) {
                res.status(404).json({
                    code: 404,
                    msg: 'No se ha encontrado ningún post.',
                    ok: false,
                });
            } else {
                res.status(201).json({
                    code: 201,
                    msg: 'Post actualizado correctamente.',
                    ok: true,
                });
            }
        }
    });
};

module.exports = {
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
};