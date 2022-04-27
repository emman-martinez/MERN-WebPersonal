const { response } = require("express");
const Menu = require('../models/menu');

// Add Menu
const addMenu = (req, res = response) => {
    const menu = new Menu(req.body);

    menu.save((err, createdMenu) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!createdMenu) {
                res.status(404).json({
                    ok: false,
                    msg: 'Error al crear el menú.',
                }); 
            } else {
                res.status(201).json({
                    ok: true,
                    msg: 'Menú creado correctamente',
                }); 
            }
        }
    });
};

// Obtener Menus
const getMenus = async(req, res = response) => {
    await Menu.find()
    .sort({ order: 'asc' })
    .exec((err, menusStored) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!menusStored) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado ningun elemento en el menú.',
                });
            } else {
                res.status(201).json({
                    ok: true,
                    menus: menusStored,
                });
            }
        }
    });
};

// Update Menus
const updateMenu = (req, res = response) => {
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!menuUpdate) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado ningun menú.',
                });
            } else {
                res.status(201).json({
                    ok: true,
                    msg: 'Menú actualizado correctamente',
                });
            }
        }
    });
};

// Activate Menus
const activateMenu = (req, res = response) => {
    const { id } = req.params;
    const { active } = req.body;

    Menu.findByIdAndUpdate(id, { active }, (err, menuStored) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!menuStored) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado el menú.',
                });
            } else {
                if (active === true) {
                    res.status(201).json({
                        ok: true,
                        msg: 'Menú activado correctamente',
                    });
                } else {
                    res.status(201).json({
                        ok: true,
                        msg: 'Menú desactivado correctamente',
                    });
                }
                
            }
        }
    });
};

// Delete Menu
const deleteMenu = (req, res) => {
    const { id } = req.params;
    Menu.findByIdAndRemove(id, (err, menuDeleted) => {
        if (err) {
            res.status(500).json({
                ok: false,
                msg: 'Error del servidor.',
            });
        } else {
            if (!menuDeleted) {
                res.status(404).json({
                    ok: false,
                    msg: 'No se ha encontrado el menú.',
                });
            } else {
                res.status(201).json({
                    ok: true,
                    msg: 'El menú ha sido eliminado correctamente.',
                }); 
            }
        }
    });
}

module.exports = {
    activateMenu,
    addMenu,
    deleteMenu,
    getMenus,
    updateMenu,
};
