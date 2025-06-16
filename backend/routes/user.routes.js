const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Route to create a new user
router.post('/create', userController.createUser);
router.post('/login',userController.loginUser)
router.get('/getUser',userController.getUser)
router.put('/update/:id',userController.updateUser);
router.delete('/delete/:id',userController.deleteUser);
module.exports = router;