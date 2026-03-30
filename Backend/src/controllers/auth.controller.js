const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')

async function userRegister(req, res) {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: 'please provide username, email, passsword'
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: 'user already exists'
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({id: user._id, username: user.username},
        process.env.JWT_KEY,
        {expiresIn: '1d'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message: 'user registered successfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function userLogin(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }

    const token = jwt.sign({id: user._id, username: user.username},
        process.env.JWT_KEY,
        {expiresIn: '1d'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    })
    
    res.status(200).json({
        message: 'user loggedin successfully',
       user: {
         id: user._id,
         username: user.username,
         email: user.email
       }
    })
}

async function userLogout(req, res){

    const token = req.cookies.token

    if(token){
        await blacklistTokenModel.create({token})
    }

    res.clearCookie('token')

    res.status(200).json({
        message: 'user logged out successfully'
    })
}

async function getMe(req, res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'user data fetch successfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    getMe
}