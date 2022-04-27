/*
    Rutas Newsletter / Newsletter
    host + /api/v1/newsletter
*/
const { Router } = require('express');
const { subscribeEmail }= require('../controllers/newsletter');

const router = Router();

// Subscribe Email
router.post('/subscribe/:email', subscribeEmail);


module.exports = router;