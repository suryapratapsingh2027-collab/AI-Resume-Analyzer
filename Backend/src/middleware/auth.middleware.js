const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklist.model')

async function authUser(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'token not provided'
        })
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({token})

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: 'token invalid'
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    }catch(err){
        return res.status(401).json({
            message: 'invalid token'
        })
    }
}

module.exports = {authUser}