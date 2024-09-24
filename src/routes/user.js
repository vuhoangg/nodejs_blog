const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController');
//const authController = require('../app/controllers/AuthController');
const authController = require('../middleware/Authorize');

router.post('/searchUser', authController.authorize(['admin']), siteController.searchUser)
// this router has search function 
router.use('/createUser', authController.authorize(['admin']), siteController.createUser)
// this router has the function of creating new users
router.use('/showUser', authController.authorize(['admin']), siteController.showUser)
// this router has the function of displaying a list of users 
router.get('/getUserById/:id', authController.authorize(['admin']), siteController.getUserById)
// this router has the function of get information by id 
router.get('/getMe', authController.authorize(['user', 'admin', 'accountant']), siteController.getMe)
// this router has the function of get information me 
router.delete('/deleteUser/:id', authController.authorize(['admin']), siteController.deleteUser)
// this router has the function of delete user by id 
router.put('/updateUser/:id', authController.authorize(['admin']), siteController.updateUser)
// this router has the function of update user by id 
router.use('/', siteController.index)

module.exports = router;