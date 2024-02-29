const { hashPwd, comparePwd } = require("../helpers/authHelper")
const userModel = require("../models/userModel")
const JWT = require('jsonwebtoken')

const registerController = async (req,res) => {
   try {
    const {name, email, password, phone, address, answer} = req.body
    
    // Validation
    if(!name){return res.send({message : 'Name is required'})}
    if(!email){return res.send({message : 'Email is required'})}
    if(!password){return res.send({message : 'Password is required'})}
    if(!phone){return res.send({message : 'phone is required'})}
    if(!address){return res.send({message : 'address is required'})}
    if(!answer){return res.send({message : 'answer is required'})}

    // check existing user
    const existingUser = await userModel.findOne({ email })

    if(existingUser){
        return res.status(200).send({
            success: false,
            message: 'Already Register. Please login'
        })
    }

    // Register User n Pwd hashing
    const hashedPwd = await hashPwd(password)

    // save
    const user = await userModel({ name, email, password: hashedPwd, phone, address, answer }).save()

    res.status(200).send({
        success: true,
        message: 'User Registered Successfully',
        user
    })
    
   } catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        message: 'Error while register user',
        error
    })
   }
}

const loginController = async (req,res) => {
    try {
        const { email, password } = req.body
        
        //Validation
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // Check User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        // Match User
        const matchUser = await comparePwd(password, user.password)
        if(!matchUser){
            return res.status(400).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        // Token
        const token  = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
       console.log(error)
       res.status(400).send({
        success: false,
        message: 'Error while Login',
        error
    })
    }
}

const forgetPwdController = async (req,res) => {
    try {
        const {email, answer, newPassword} = req.body

        // Validation
        if(!email){return res.send({message: 'Email is required'})}
        if(!answer){return res.send({message: 'answer is required'})}
        if(!newPassword){return res.send({message: 'New Password is required'})}

        // Check User
        const user = await userModel.findOne({ email, answer })

        // If user doesn't exist
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            })
        }

        // Hash New Password
        const hashed = await hashPwd(newPassword)

        // Updating New Password
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password reset successfully done'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while forget password to reset',
            error
        })
    }
}

module.exports = {registerController, loginController, forgetPwdController}


