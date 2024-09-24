const express = require('express');
const router = express.Router();
const authController = require('../middleware/Authorize');
const authController1 = require('../app/controllers/AuthController');

// This router is use for Login and authenticated
router.post('/login', authController1.login);
// This route is reserved for users with roles of admin 
router.get('/admin', authController.authorize(['user']), (req, res) => {
    res.send('Welcome Admin');
});
// This route is reserved for users with roles of admin or user or accoutant 
router.get('/dashboard', authController.authorize(['user', 'admin', 'accountant']), (req, res) => {
    res.send('Welcome User or Admin or acountant ');
});

module.exports = router;