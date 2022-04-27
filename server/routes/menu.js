/*
    Rutas Menu / menu
    host + /api/v1/menu
*/
const { Router } = require('express');
const { 
    activateMenu, 
    addMenu, 
    deleteMenu,
    getMenus, 
    updateMenu, 
} = require('../controllers/menu');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Add Menú
router.post('/add-menu', validarJWT, addMenu);

// Get Menus
router.get('/get-menus', getMenus);

// Update Menus
router.put('/update-menu/:id', validarJWT, updateMenu);

// Activate Menu
router.put('/activate-menu/:id', validarJWT, activateMenu);

// Delete Menu
router.delete('/delete-menu/:id', validarJWT, deleteMenu)

module.exports = router;