const { response } = require("express");
const Newsletter = require('../models/newsletter');

// Subscribe Email
const subscribeEmail = (req, res = response) => {
    const { email } = req.params;
    const newsletter = new Newsletter();

    if (!email) {
        res.status(404).json({
            code: 404,
            msg: 'El email es obligatorio.',
            ok: false,
        });
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStored) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    msg: 'El email ya existe.',
                    ok: false,
                });
            } else {
                if (!newsletterStored) {
                    res.status(400).json({
                        code: 400,
                        msg: 'Error al registrar el newslatter.',
                        ok: false,
                    });
                } else {
                    res.status(200).json({
                        code: 200,
                        msg: 'Email registrado correctamente.',
                        ok: true,
                    });
                }
            }
        });
    }
};

module.exports = {
    subscribeEmail,
};