/*
    Rutas Usuarios / Auth
    host + /api/v1/auth
*/
const { Router } = require('express');
const { body, check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { signIn, signUp, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// Crear Usuario
router.post(
    '/sign-up',
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Passwords are required.').not().isEmpty(),
    check('repeatPassword', 'Passwords are required.').not().isEmpty(),
    check('password', 'The password must be 6 characters.').isLength({ min: 6 }),
    check('repeatPassword', 'The password must be 6 characters.').isLength({ min: 6 }),
    body('repeatPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match.');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),
    validarCampos,
    signUp,
);

// Login Usuario
router.post(
    '/sign-in', [ // Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    signIn,
);

// Revalidar Token para Usuario
router.get('/renew', validarJWT, revalidarToken);


// // Reestablecer Contraseña
// router.put(
//     '/restablish-pass', [ // Middlewares
//         check('email', 'El email es obligatorio').isEmail(),
//         check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
//         validarCampos
//     ],
//     restablecerContrasena
// );
// // Enviar Email Confirma Registro
// router.post(
//     '/send-mail', [
//         check('email', 'El email es obligatorio').isEmail(),
//         validarCampos
//     ],
//     enviarCorreoRegistro
// );
// // Enviar Email Confirma Restablecer Contraseña
// router.post(
//     '/resend-mail', [
//         check('email', 'El email es obligatorio').isEmail(),
//         validarCampos
//     ],
//     enviarCorreoRestableceContrasena
// );

router.get('/', (req, res) => {
    res.json({
        ok: true,
    });
});

module.exports = router;