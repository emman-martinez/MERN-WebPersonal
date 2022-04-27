/*
    Rutas Posts / Posts
    host + /api/v1/post
*/
const { Router } = require('express');
const { 
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} = require('../controllers/post');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Add Post
router.post('/add-post', validarJWT, addPost);

// Delete Posts
router.delete('/delete-post/:id', validarJWT, deletePost);

// Get Posts
router.get('/get-posts', getPosts);

// Get Post
router.get('/get-post/:url', getPost);

// Update Posts
router.put('/update-post/:id', validarJWT, updatePost);

module.exports = router;