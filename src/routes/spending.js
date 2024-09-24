const express = require('express') // import express library 
const router = express.Router() // import

const SpendingController = require('../app/controllers/SpendingController');
//const authController = require('../app/controllers/AuthController'); // Import authController to use  function of authorize
const authController = require('../middleware/Authorize'); // Import authController to use  function of authorize


router.get('/showSpendingAll', SpendingController.showSpendingAll)
router.get('/showSpending', authController.authorize(['user', 'admin', 'accountant']), SpendingController.showSpending);
// this router has the function of displaying a list of spending 
router.post('/createSpendingShow', authController.authorize(['user', 'admin', 'accountant']), SpendingController.createSpendingShow);
// this router has the function of creating  a new spending 
router.delete('/deleteSpending/:id', authController.authorize(['admin', 'accountant']), SpendingController.deleteSpending)
// this router has the function of delete a spending 
router.put('/updateSpending/:id', authController.authorize(['admin', 'accountant']), SpendingController.updateSpending)
// this router has the function of update a spending 
router.patch('/updateStatus/:id', authController.authorize(['admin']), SpendingController.updateStatus)
// this router has the function of update for status of speding 
router.get('/getSpendingById/:id', authController.authorize(['admin', 'accountant', 'user']), SpendingController.getSpendingById)
// this router has the function of get infomation by id 
router.use('/', SpendingController.index)
module.exports = router;