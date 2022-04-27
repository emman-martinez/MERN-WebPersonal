const { response } = require("express");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { exists } = require("../models/user");
const User = require('../models/user');

// Obtener Usuarios
const getUsers = async(req, res = response) => {

    const users = await User.find();

    if(!(users.length > 0)) {
        res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado ningun usuario.',
        });
    } else {
        res.status(201).json({
            ok: true,
            users,
        });
    }
};

// Obtener Usuarios
const getUsersActive = async(req, res = response) => {
    const query = req.query;

    const users = await User.find({ active: query.active });

    if(!(users.length > 0)) {
        res.status(404).json({
            ok: false,
            msg: 'No se ha encontrado ningun usuario activo',
        });
    } else {
        res.status(201).json({
            ok: true,
            users,
        });
    }
};

//  Update User
const updateUser = async(req, res) => {
    const userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;
    const { password } = userData;

    if (password) {
         // Encriptar contraseña
         const salt = await bcrypt.genSaltSync();
         userData.password = bcrypt.hashSync(password, salt);
    }

    User.findByIdAndUpdate(
        { _id: params.id },
        userData,
        (err, userUpdate) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    msg: 'Error del servidor',
                });
            } else {
                if (!userUpdate) {
                    res.status(400).json({
                        ok: false,
                        msg: 'No se ha encontrado ningún usuario.'
                    });
                } else {
                    res.status(201).json({
                        ok: true,
                        msg: 'Usuario actualizado correctamente.'
                    });
                }
            }
        }
    );
};

// Get Avatar
const getAvatar = (req, res) => {
    const avatarName = req.params.avatarName;
    const filePath = `./uploads/avatar/${ avatarName }`;

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(404).json({
                ok: false,
                msg: 'El avatar que buscas no existe.',
            });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
};

// Upload Avatar
const uploadAvatar = (req, res) => {
    const params = req.params;

    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor',
            });
        } else {
            if (!userData) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha podido cargar el avatar.',
                });
            } else {
                uploadAvatarSuccess(req, res, params, userData);
            }
        }
    });
};

const uploadAvatarSuccess = (req, res, params, userData) => {
    let user = userData;

    if (req.files) {
        let filePath = req.files.avatar.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];
        let extSplit = fileName.split('.');
        let fileExt = extSplit[1];

        if (fileExt !== 'png' && fileExt !== 'PNG' && fileExt !== 'jpg') {
            res.status(404).json({
                ok: false,
                msg: 'Extensión de imagen no valida. (Extensiones permitidas: .png y .jpg)',
            });
        } else {
            user.avatar = fileName;
            User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        msg: 'Error del servidor.',
                    });
                } else {
                    if (!userResult) {
                        res.status(404).json({
                            ok: false,
                            msg: 'No se ha encontrado ningún usuario.',
                        });
                    } else {
                        userResult.avatar = fileName;
                        res.status(201).json({
                            ok: true,
                            user: userResult,
                        });
                    }
                }
            });
        }
    }
};

// Activate User
const activateUser = (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    User.findByIdAndUpdate(id, { active }, (err, userStored) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!userStored) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado el usuario',
                });
            } else {
                if (active === true) {
                    res.status(201).json({
                        ok: true,
                        msg: 'Usuario activado correctamente.',
                    });   
                } else {
                    res.status(201).json({
                        ok: true,
                        msg: 'Usuario desactivado correctamente.',
                    });  
                }
            }
        }
    });
};

// Delete User
const deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!userDeleted) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado el usuario.',
                });
            } else {
                res.status(201).json({
                    ok: true,
                    msg: 'El usuario ha sido eliminado correctamente.',
                }); 
            }
        }
    });
}

// Create User in Admin
const signUpAdmin = async(req, res = response) => {
    try {
        const { email, password } = req.body;
        const emailLowerCase = email.toLowerCase();
        let user = await User.findOne({ email: emailLowerCase });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with that email already exists',
            });
        }

        user = new User(req.body);
        user.email = emailLowerCase;
        user.active = true;

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente.',
        });
    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the Administrator'
        });
    }
};

module.exports = {
    activateUser,
    deleteUser,
    getAvatar,
    getUsers,
    getUsersActive,
    signUpAdmin,
    updateUser,
    uploadAvatar,
};