/*
    Rutas Usuarios / Users
    host + /api/v1/users
*/
const { Router } = require('express');
const { body, check } = require('express-validator');
const multipart = require('connect-multiparty');
const { 
    activateUser,
    deleteUser,
    getAvatar, 
    getUsers, 
    getUsersActive, 
    signUpAdmin,
    updateUser, 
    uploadAvatar,
} = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const md_upload_avatar = multipart({ uploadDir: './uploads/avatar' });

const router = Router();

// Get all users
router.get('/', validarJWT, getUsers);

// Get all users active
router.get('/active', validarJWT, getUsersActive);

// Update User
router.put('/update-user/:id', validarJWT, updateUser)

// Upload the Avatar
router.put('/upload-avatar/:id', [validarJWT, md_upload_avatar], uploadAvatar);

// Get Avatar
router.get('/get-avatar/:avatarName', getAvatar);

// Activate user
router.put('/activate-user/:id', validarJWT, activateUser);

// Delete user
router.delete('/delete-user/:id', validarJWT, deleteUser);

// Create User in Admin
router.post(
    '/sign-up-admin',
    [
        validarJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('lastname', 'Lastname is required').not().isEmpty(),
        check('email', 'Email is required.').isEmail(),
        check('password', 'Passwords are required.').not().isEmpty(),
        check('password', 'The password must be 6 characters.').isLength({ min: 6 }),
        validarCampos
    ],
    signUpAdmin,
);

module.exports = router;