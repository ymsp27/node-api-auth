const express = require('express')
const { registerController, loginController, forgetPwdController } = require('../controllers/authController')
const { requireSign, isAdmin } = require('../middlewares/authMiddleware')

// Router Object
const router = express.Router()

// Routing
//REGISTER || HTTP POST Method
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/forget-pwd', forgetPwdController)
// Protect Route Auth for User
router.get('/user-auth', requireSign, (req,res)=>{
    res.status(200).send({ ok: true })
})

// Protect isAdmin
router.get('/admin-auth',requireSign, isAdmin, (req,res)=> {
    res.status(200).send({ ok: true })
})


module.exports = router