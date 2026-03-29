const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const authRouter = Router()

authRouter.post('/register', authController.userRegister )
authRouter.post('/login', authController.userLogin)
authRouter.get('/logout', authController.userLogout )
authRouter.get('/get-me', authMiddleware.authUser, authController.getMe)



module.exports = authRouter