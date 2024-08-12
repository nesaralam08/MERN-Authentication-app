const Route = require('express').Router()
const {loginValidation,singupValidation} = require('../middleware/AuthValidation')
const {loginController,signupController} = require('../controllers/userController')

Route.post('/login',loginValidation,loginController);
Route.post('/signup',singupValidation,signupController)

module.exports = Route