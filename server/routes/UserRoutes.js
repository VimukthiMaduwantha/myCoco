const UserController = require('../controller/UserController');
const express = require('express');

const UserRouter = express.Router();

//save user
UserRouter.post('/createUser', UserController.saveUser);

//Get all users
UserRouter.get('/getUser', UserController.GetAllUsers);

//Get user by user ID
UserRouter.get('/getUSerByUserID/:updateID', UserController.GetUsewrByUserID);

//Update user details
UserRouter.put('/updateUser', UserController.UpdateUserDetails);

//login user
UserRouter.post('/loginUser', UserController.loginUser);


module.exports = UserRouter;