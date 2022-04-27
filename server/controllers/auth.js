const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../services/jwt');

// Create User
const signUp = async(req, res = response) => {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();

    try {
        let user = await User.findOne({ email: emailLowerCase });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with that email already exists',
            });
        }

        user = new User(req.body);
        user.email = emailLowerCase;
        user.active = false;
        user.role = 'admin';

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar nuestro JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            accessToken: token,
            ok: true,
            user,
        });
    } catch(error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the Administrator'
        });
    }

};

// Login Usuario
const signIn = async(req, res = response) => {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();

    try {
        const user = await User.findOne({ email: emailLowerCase });
        // console.log(usuario);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        } else {
            if (!user.active) {
                return res.status(200).json({
                    ok: true,
                    msg: 'El usuario no se ha activado',
                });
            } else {
                // Generar nuestro JWT
                const token = await generarJWT(user.id, user.name);

                res.status(201).json({
                    ok: true,
                    uid: user.id,
                    name: user.name,
                    accessToken: token,
                });
            }
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        });
    }

};

// Revalidar Token para Usuario
const revalidarToken = async(req, res = response) => {
    const { uid, name } = req;

    // Generar nuevo JWT y retornarlo en la petición
    const accessToken = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        accessToken
    });

};

module.exports = {
    revalidarToken,
    signIn,
    signUp,
};